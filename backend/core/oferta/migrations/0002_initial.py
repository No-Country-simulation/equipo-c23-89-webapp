# Generated by Django 5.1.5 on 2025-02-06 20:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('oferta', '0001_initial'),
        ('reclutador', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='oferta',
            name='id_reclutador',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reclutador.recruiterprofile'),
        ),
    ]
