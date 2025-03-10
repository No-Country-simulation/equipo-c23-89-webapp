"""
URL configuration for src project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.authtoken.views import obtain_auth_token



schema_view = get_schema_view(
    openapi.Info(
        title="API de Usuarios y Reclutadores",
        default_version='v1',
        description="Documentación de la API de usuarios y reclutadores",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="support@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/usuario/', include('core.usuario.urls')),  # Rutas de la app usuario
    path('api/reclutador/', include('core.reclutador.urls')),
    path('api/oferta', include('core.oferta.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),# Rutas de la app recruiter
    path('candidatos/', include('core.candidato.urls')),
    path('aplicaciones/', include('core.aplicacion.urls')),
    path('', include('core.usuario.urls')),  # Añadir esta línea
    path('api/login/', obtain_auth_token, name="api_login"),
]
