# -*- coding: utf-8 -*-
# Generated by Django 1.9c1 on 2015-12-04 21:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0002_auto_20151204_0437'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(null=True, upload_to=b''),
        ),
    ]
