# Generated by Django 5.1.5 on 2025-02-22 11:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='libro',
            name='titulo_es',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
