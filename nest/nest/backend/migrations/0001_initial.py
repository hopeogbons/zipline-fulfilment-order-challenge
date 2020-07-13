# Generated by Django 3.0.7 on 2020-06-17 03:33

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('order_id', models.IntegerField(primary_key=True, serialize=False)),
                ('requested', django.contrib.postgres.fields.jsonb.JSONField()),
                ('pending', django.contrib.postgres.fields.jsonb.JSONField()),
                ('is_pending', models.BooleanField(default=False)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('date_deleted', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('product_id', models.IntegerField(primary_key=True, serialize=False)),
                ('product_name', models.CharField(max_length=100, unique=True)),
                ('mass_g', models.FloatField(default=0.0)),
                ('quantity', models.IntegerField(default=0.0)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('date_deleted', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Shipment',
            fields=[
                ('shipment_id', models.AutoField(primary_key=True, serialize=False)),
                ('order_id', models.IntegerField(default=0)),
                ('shipped', django.contrib.postgres.fields.jsonb.JSONField()),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('date_deleted', models.DateTimeField(blank=True, null=True)),
            ],
        ),
    ]