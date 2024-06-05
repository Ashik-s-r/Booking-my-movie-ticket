# Generated by Django 5.0.2 on 2024-05-02 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Movie_name', models.CharField(max_length=500)),
                ('Movie_date', models.DateField()),
                ('Movie_time', models.TimeField()),
                ('User_details', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Movie_name', models.CharField(max_length=500)),
                ('Movie_date', models.DateField()),
                ('Movie_time', models.TimeField()),
                ('Description', models.TextField()),
                ('poster', models.ImageField(upload_to='')),
            ],
        ),
    ]