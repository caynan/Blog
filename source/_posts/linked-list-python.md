title: Linked List in Python
tags:
  - python
  - data structure
  - ''
disqusIdentifier: linked-list-python
keywords:
  - data structure
  - linked list
  - python
thumbnailImage: >-
  https://res.cloudinary.com/caynan/image/upload/v1477046788/train-cover_min_z7lwml.jpg
thumbnailImagePosition: left
autoThumbnailImage: 'yes'
metaAlignment: center
coverImage: >-
  https://res.cloudinary.com/caynan/image/upload/v1477046788/train-cover_min_z7lwml.jpg
coverMeta: in
coverSize: full
comments: true
mathjax: true
categories: []
author: Caynan Sousa
date: 2016-10-21 01:38:00
---
Today, we're going to implement a linked list in python

<!-- more -->

### Overview

{% blockquote Wikipedia http://en.wikipedia.org/wiki/Linked_list Linked List%}
In computer science, a linked list is a data structure consisting of a group
of nodes which together represent a sequence. Under the simplest form, each
node is composed of a data and a reference (in other words, a link) to the
next node in the sequence; more complex variants add additional links. This
structure allows for efficient insertion or removal of elements from any
position in the sequence.  
{% endblockquote %}


Linked Lists are really simple data structures, we only have to remember when solving problems that
involve them, to notice if we're using singly linked lists (only have links to the next node) or
doubly linked lists (links for previous and next nodes).

### CODE!

Enough talking let's start coding. First you should note the elements that a
Linked List have, I see two of them, a Node and obviously the Linked List in
itself, which if you think we could represent as a Node, we only need
the Head of a Linked List to represent it.

So let's create two classes in python, `Node` that is going to serve as a
container for the data, and `LinkedList` that is going to provide us with
different methods to manipulate the data structure.

{% codeblock lang:python  %}
class _Node(object):
   def __init__(self, data=None, next=None):
      self.data = data
      self.next = next

   def __str__(self):
      return str(self.data)
{% endcodeblock  %}

There is only two things to note on our implementation of **Node**, first we're
declaring it as a protected class, eventhough Python don't have a true
protected notion, it's more of a [notation](https://google-styleguide.googlecode.com/svn/trunk/pyguide.html#Naming), but I'm digressing here, the other interesting thing is that we're rewriting the `__str__`
method from object, Node's superclass, so every time we print our Nodes we're going to see the data they store, which in my opinion makes more sense.

Now let's see our biggest class, **LinkedList**:

{% codeblock lang:python %}
class LinkedList(object):
   def __init__(self):
      self.length = 0
      self.head = None

   def __str__(self):
      return self._toString()

   def __len__(self):
      return self.length

   def _toString(self):
      node = self.head
      string_to_return = []

      # Print the value of the nodes
      while node:
      string_to_return.append('%s ' % node)
      node = node.next

      return ''.join(string_to_return).strip()
{% endcodeblock %}

There are two things worth noting in this part of our class, first we're rewriting the method
`__len__` from object, which permit us call `len` in our LinkedList, also note we're using a list
to accumulate the string in the `_toString` method, this is to avoid waste of space, since strings
are immutable in python, using something like `+=` will result in many objects.

{% codeblock lang:python %}
def add(self, data):
   if self.head is None:
      self.head = _Node(data=data)
      self.length += 1
   else:
      node = self.head
      while node:
         if node.next is None:
            node.next = _Node(data=data)
            self.length += 1
            break
         else:
            node = node.next
{% endcodeblock %}

Our add method, is pretty straight forward, if our Linked List is empty (head is None) we create a
new node as head. If not, we find the tail of list, and insert our new Node after it.

{% codeblock lang:python %}
def index(self, x):
   for i in range(self.length):
      if node.data = x:
         return i
      else:
         node = node.next
   raise Exception('Item Not Found!)
{% endcodeblock %}

{% codeblock lang:python %}
def remove(self, x):
   # case is empty
   if self.head is None:
      raise Exception('Trying to remove from empty list')
   # case is head
   elif self.head.data == x:
      self.head = None
      self.length -= 1
   # other cases
   else:
      node = self.head
      while node:
         if node.next is None:
            raise Exception('Item Not Found!')
         elif node.next.data == x:
            node.next = node.next.next
            self.length -= 1
         else:
            node = node.next
{% endcodeblock %}

We finally get to our final methods, `index`, which provide us the index of a given Node, if it exists, and `remove` which as the name says remove some node given the data it contains.

### The End

Well folks that was it, as an exercise try to implement a doubly linked list, without looking to the code here, so you could make sure that you're truly understanding linked lists, and not simply rewriting the code.

image by [Marina Molineiro](https://unsplash.com/search/train?photo=kRqA1yFZp1s)