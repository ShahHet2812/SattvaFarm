from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    fieldsets = UserAdmin.fieldsets + (
        ("Additional Info", {
            "fields": (
                'individual_type',
                'id_proof',
                'location',
            )
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Additional Info", {
            "fields": (
                'individual_type',
                'id_proof',
                'location',
            )
        }),
    )

admin.site.register(CustomUser, CustomUserAdmin)
