# Generated by Django 5.2.1 on 2025-05-30 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('personas', '0002_alter_persona_apellidos_alter_persona_edad_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='persona',
            name='donador',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
    ]
