from django.db import models
from time import time
from django.db.models.signals import post_delete
from django.dispatch import receiver

# image uploading based on tutorial at http://code.techandstartup.com/django/images/

def generate_filename(instance, filename):
    ext = filename.split('.')[-1]
    return 'images/' + str(int(time())) + '.' + ext

class Post(models.Model):
  author = models.ForeignKey('auth.User')
  title = models.CharField(max_length=200)
  image = models.ImageField(null=True, blank = True, upload_to=generate_filename)
  text = models.TextField()
  subtitle = models.TextField(null=True)
  created_date = models.DateTimeField( blank= False, null=True)
  published_date = models.DateTimeField( blank= True, null=True)

  def get_absolute_url(self):
    return reverse("flavor_detail", kwargs={"title": self.title})

  def publish(self):
      self.save()

  def __str__(self):
      return self.title

      #delete image file when delete request is sent.

@receiver(post_delete, sender=Post)
def news_post_delete_handler(sender, **kwargs):
      Post = kwargs['instance']
      if Post.image:
        storage, path = Post.image.storage, Post.image.path
        storage.delete(path)


class Comment(models.Model):
    author = models.ForeignKey('auth.User')
    post = models.ForeignKey('Post', related_name='comments')
    text = models.CharField(max_length = 500)
    created_date = models.DateTimeField(auto_now_add = True)
    updated_date = models.DateTimeField(auto_now = True)

    def publish(self):
        self.save()

    def __str__(self):
        return self.text + " on " + self.post.title

    def __unicode(self):
        return self.text
