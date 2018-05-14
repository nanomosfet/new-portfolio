from setuptools import setup, find_packages

setup(
    name='ssl_grade_checker',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'flask',
        'sqlalchemy',
        'psycopg2',
        'requests',
        'gunicorn'
    ],
)
