from rest_framework import serializers
from news.models import Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
      model = Comment
      fields = ('text', 'id')


class PostSerializer(serializers.Serializer):
    author = serializers.StringRelatedField()
    title = serializers.CharField(max_length=200)
    text = serializers.CharField(max_length= None, min_length = None, allow_blank = False)
    image = serializers.ImageField( max_length = None)
    subtitle = serializers.CharField(allow_blank=True)
    id = serializers.IntegerField()
    created_date = serializers.DateTimeField(format = None, input_formats = None)
    published_date = serializers.DateTimeField(format = None, input_formats = None)
    # comments = serializers.StringRelatedField(many=True)
    comments = CommentSerializer(many=True, read_only=True)

class UserSerializer(serializers.Serializer):
    email = serializers.StringRelatedField()
    first_name =serializers.StringRelatedField()
    last_name = serializers.StringRelatedField()
    username = serializers.StringRelatedField()
