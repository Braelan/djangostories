from django.db import models



class Post(models.Model):
  author = models.ForeignKey('auth.User')
  title = models.CharField(max_length=200)
  image = models.ImageField(null=True)
  text = models.TextField()
  subtitle = models.TextField(null=True)
  created_date = models.DateTimeField( blank= True, null=True)
  published_date = models.DateTimeField( blank= True, null=True)

  def publish(self):
      self.save()

  def __str__(self):
      return self.title
