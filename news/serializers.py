from rest_framework import serializers

class PostSerializer(serializers.Serializer):
    author = serializers.StringRelatedField()
    title = serializers.CharField(max_length=200)
    text = serializers.CharField(max_length= None, min_length = None, allow_blank = False)
    image = serializers.ImageField( max_length = None)
    subtitle = serializers.CharField(allow_blank=True)
    id = serializers.IntegerField()
    created_date = serializers.DateTimeField(format = None, input_formats = None)
    published_date = serializers.DateTimeField(format = None, input_formats = None)
