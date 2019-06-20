import os
import sys
import scipy.io
import scipy.misc
import matplotlib.pyplot as plt
from matplotlib.pyplot import imshow
from PIL import Image
from nst_utils import *
import numpy as np
import tensorflow as tf

%matplotlib inline

## NOTES ##

###

##IMPORTS
model = load_vgg_model("model/imagenet-vgg-verydeep-19.mat")
content_image = scipy.misc.imread("images/shunsou_style.jpg")
style_image = scipy.misc.imread("images/monet_800600.jpg")


## Start interactive session
sess = tf.InteractiveSession()

## RESHAPE IMAGES
content_image = reshape_and_normalize_image(content_image)
style_image = reshape_and_normalize_image(style_image)


## INITIALIZE GENERATED IMAGE WITH NOISY SEED
generated_image = generate_noise_image(content_image)


## RUN THE MODEL!

# Assign the content image to be the input of the VGG model.  
sess.run(model['input'].assign(content_image))

# Select the output tensor of layer conv4_2
out = model['conv4_2']

# Set a_C to be the hidden layer activation from the layer we have selected
a_C = sess.run(out)

# Set a_G to be the hidden layer activation from same layer. 
a_G = out

# Compute the content cost
J_content = compute_content_cost(a_C, a_G)

# Assign the input of the model to be the "style" image 
sess.run(model['input'].assign(style_image))

# define weights for style layers
STYLE_LAYERS = [
    ('conv1_1', 0.2),
    ('conv2_1', 0.2),
    ('conv3_1', 0.2),
    ('conv4_1', 0.2),
    ('conv5_1', 0.2)]

# Compute the style cost
J_style = compute_style_cost(model, STYLE_LAYERS)

# Compute total cost
J = total_cost(J_content, J_style, alpha = 10, beta = 40)

# define optimizer (1 line)
optimizer = tf.train.AdamOptimizer(2.0)

# define train_step (1 line)
train_step = optimizer.minimize(J)

## DEFINE THE MODEL
def model_nn(sess, input_image, num_iterations = 100):
    
    # Initialize global variables (you need to run the session on the initializer)
    sess.run(tf.global_variables_initializer())
    
    # Run the noisy input image (initial generated image) through the model
    sess.run(model["input"].assign(input_image))
    
    for i in range(num_iterations):
    
        # Run the session on the train_step to minimize the total cost
        sess.run(train_step)
        
        # Compute the generated image by running the session on the current model['input']
        generated_image = sess.run(model['input'])

        # Save every n iterations
        if i%10 == 0:
            Jt, Jc, Js = sess.run([J, J_content, J_style])
            
            #print("Iteration " + str(i) + " :")
            #print("total cost = " + str(Jt))
            #print("content cost = " + str(Jc))
            #print("style cost = " + str(Js))
            
            # save current generated image in the "/output" directory
            save_image("output/stettheimer-cat_" + str(i) + ".png", generated_image)
    
    # save last generated image
    save_image('output/stettheimer-cat_generated_image.jpg', generated_image)
    
    return generated_image

## GENERATE THE IMAGE!! ## this could take up to half an hour
model_nn(sess, generated_image)

# end of program
