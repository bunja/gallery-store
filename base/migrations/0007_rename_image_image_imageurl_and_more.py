# Generated by Django 4.0.3 on 2022-04-23 18:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_remove_painting_image_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='image',
            old_name='image',
            new_name='imageUrl',
        ),
        migrations.RenameField(
            model_name='image',
            old_name='painting',
            new_name='paintingId',
        ),
    ]