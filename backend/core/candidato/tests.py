from django.test import TestCase, Client
from django.urls import reverse
from .models import Candidato
from django.core.files.uploadedfile import SimpleUploadedFile


# para ejecutar pruebas: "python manage.py test core.candidato.tests"
class CandidatoTestCase(TestCase):
    def test_example(self):
        # Aquí va la lógica de tu test
        self.assertEqual(1 + 1, 2)
        
class CandidatoModelTest(TestCase):
    '''Clase para probar la creación, validación y comportamiento de los campos del modelo Candidato,
    incluyendo la validación del campo de CV (si está presente o no).'''
    
    def setUp(self):
        ''' Configura el entorno de prueba creando un candidato con CV simulado y preparaciones 
        necesarias para las pruebas. '''
        # Simulación de un archivo PDF para el campo CV
        self.cv_simulado = SimpleUploadedFile(
            name='cv_prueba.pdf',
            content=b'Contenido del CV en binario.',
            content_type='application/pdf'
        )
        
        self.candidato = Candidato.objects.create(
            experiencia="5 años en desarrollo de software.",
            educacion="Ingeniería en Sistemas.",
            cv=self.cv_simulado
        )

    def test_creacion_candidato(self):
        '''Verifica que los datos proporcionados al crear un Candidato se almacenen correctamente en la base de datos.'''
        self.assertEqual(self.candidato.experiencia, "5 años en desarrollo de software.")
        self.assertEqual(self.candidato.educacion, "Ingeniería en Sistemas.")

    def test_no_cv(self):
        '''Verifica que al crear un candidato sin CV, el campo CV sea None.'''
        candidato_sin_cv = Candidato.objects.create(
            experiencia="3 años en diseño gráfico.",
            educacion="Licenciatura en Diseño."
        )
        self.assertIsNone(candidato_sin_cv.cv)

    def test_con_cv(self):
        '''Verifica que un candidato con CV tenga una URL asociada en Cloudinary.'''
        self.assertIsNotNone(self.candidato.cv)
        self.assertTrue(self.candidato.cv.url.startswith('http://res.cloudinary.com/'))


class CandidatoViewsTest(TestCase):
    '''Clase para probar las vistas de Django asociadas al modelo Candidato, incluyendo operaciones CRUD 
    (crear, leer, actualizar, eliminar) para garantizar el correcto funcionamiento de las vistas.'''
    
    def setUp(self):
        '''Configura el entorno de prueba creando un candidato, y el cliente HTTP necesario
        para realizar las solicitudes.'''
        self.candidato = Candidato.objects.create(
            experiencia="5 años en desarrollo de software.",
            educacion="Ingeniería en Sistemas."
        )
        self.client = Client()

    def test_lista_candidatos(self):
        '''Verifica que la vista de lista de candidatos muestra correctamente la información del candidato.'''
        response = self.client.get(reverse('lista_candidatos'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "5 años en desarrollo de software.")

    def test_detalle_candidato(self):
        '''Verifica que la vista de detalle de un candidato muestra la información correcta del candidato
        seleccionado.'''
        response = self.client.get(reverse('detalle_candidato', args=[self.candidato.id_candidato]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Ingeniería en Sistemas.")
        
    def test_crear_candidato(self):
        '''Verifica que la creación de un nuevo candidato redirige correctamente a la lista de candidatos 
        y que el candidato se crea con los datos proporcionados.'''
        data = {
            'experiencia': '3 años en desarrollo web.',
            'educacion': 'Licenciatura en Ciencias de la Computación.'
        }
        response = self.client.post(reverse('crear_candidato'), data)
        self.assertEqual(response.status_code, 302)  # Redirección esperada
        self.assertRedirects(response, reverse('lista_candidatos'))
        candidato_creado = Candidato.objects.get(experiencia='3 años en desarrollo web.')
        self.assertEqual(candidato_creado.educacion, 'Licenciatura en Ciencias de la Computación.')
        
    def test_editar_candidato(self):
        '''Verifica que la edición de un candidato existente se guarda correctamente y redirige a la lista de candidatos.'''
        data = {
            'experiencia': '6 años en desarrollo de software.',
            'educacion': 'Ingeniería en Software.'
        }
        response = self.client.post(reverse('editar_candidato', args=[self.candidato.id_candidato]), data)
        self.assertEqual(response.status_code, 302) 
        self.assertRedirects(response, reverse('lista_candidatos'))
        self.candidato.refresh_from_db()  # Actualiza el objeto candidato desde la base de datos
        self.assertEqual(self.candidato.experiencia, '6 años en desarrollo de software.')
        self.assertEqual(self.candidato.educacion, 'Ingeniería en Software.')
        
    def test_eliminar_candidato(self):
        '''Verifica que la eliminación de un candidato redirige correctamente a la lista y elimina al candidato de la base de datos.'''
        response = self.client.post(reverse('eliminar_candidato', args=[self.candidato.id_candidato]))
        self.assertEqual(response.status_code, 302)  
        self.assertRedirects(response, reverse('lista_candidatos'))
        with self.assertRaises(Candidato.DoesNotExist):
            Candidato.objects.get(id_candidato=self.candidato.id_candidato)
