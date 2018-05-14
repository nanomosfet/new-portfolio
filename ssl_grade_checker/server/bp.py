import requests
from sqlalchemy.exc import IntegrityError

from flask import Flask, render_template, url_for, jsonify, request, Blueprint

from server.database import init_db, db_session, drop_all
from server.models import Domain

from datetime import datetime
init_db()
bp = Blueprint('bp', __name__, static_folder='static')

@bp.route('/', methods=['get'])
def index():
    return render_template('home.html')

@bp.route('/domains/JSON')
def domains_JSON():
    domains = db_session.query(Domain).all()
    db_session.close()
    return jsonify(Domains=[i.serialize for i in domains])

@bp.route('/domains/addtestdata', methods=['get'])
def add_test_domains():
    domains = []
    domains.append(Domain(
        domain_name='example_one.ru',
        grade='A+',
        last_updated=1491918400000,
        status='OK',
        active=True))
    domains.append(Domain(
        domain_name='example_two.ru',
        grade='F',
        last_updated=1491918400000,
        status='OK',
        active=True))
    domains.append(Domain(
        domain_name='example_three.ru',
        grade='B',
        last_updated=1491918400000,
        status='OK',
        active=True))
    domains.append(Domain(
        domain_name='example_disabled.ru',
        grade='A+',
        last_updated=1491918400000,
        status='OK',
        active=False))
    db_session.add_all(domains)
    db_session.commit()
    return "success"

@bp.route('/domains/resetdata', methods=['get'])
def reset_domain_data():
    domains = db_session.query(Domain).all()
    for d in domains:
        db_session.delete(d)
    db_session.commit()
    drop_all()
    return "success"

@bp.route('/checkSSL/<domain_name>')
def check_ssl(domain_name):
    r = requests.get('https://api.ssllabs.com/api/v2/analyze?host=%s' % domain_name)
    return jsonify(r.json())

@bp.route('/addDomain', methods=['POST'])
def add_domain():
    try:
        if request.form['active'] == 'true':
            active = True
        else:
            active = False
        domain = Domain(
        domain_name=request.form['domain_name'],
        grade=request.form['grade'],
        last_updated=request.form['last_updated'],
        status=request.form['status'],
        active=active)

        db_session.add(domain)
        db_session.commit()
        db_session.close()
        return "success!"
    except IntegrityError:
        db_session.rollback()
        # Domain already exists so just update the current one.
        domain = db_session.query(Domain)\
            .filter_by(domain_name=request.form['domain_name']).one()

        domain.grade = request.form['grade']
        domain.last_updated = request.form['last_updated']
        domain.status = request.form['status']
        domain.active = request.form['active']
        db_session.commit()
        db_session.close()
        return "updated previous host %s" % request.form['domain_name']

@bp.route('/removeDomain', methods=['POST'])
def remove_domain():
    domain = db_session.query(Domain).filter_by(domain_name=request.form['domain_name']).one()
    db_session.delete(domain)
    db_session.commit()
    db_session.close()
    return "successfully deleted domain %s" % request.form['domain_name']
