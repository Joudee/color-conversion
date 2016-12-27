# color-conversion

##Intention

JavaScript library for color conversion and manipulation with support for CSS color strings.

##Installation

```sh
npm install color-conversion
```

## Usage

```js
var Color = require("color-conversion")
```
or
```js
import Color from "color-conversion"
```
You can also use it in HTML with [<script></script>]().

## Setters

The instance is tranforming RGB to HSL. You should use the 'toHSL' method.
```js
var color = Color("rgb(255, 255, 255)");  	//It's can write as var color = Color("255, 255, 255");
color.toHSL();  		//[3,0,100]
```
It's also can transform HSL to RGB(You should use the 'toRGB' method.),such as:
```js
var color = Color("hsl(100, 10%, 25%)");	//It's can write as var color = Color("100, 10%, 25%");
color.toRGB(); //[60,64,57]
```
Transforming hex to hsl or grb.
```js
var color = Color("ffffff");	//It's can write as var color = Color("#ffffff");
color.toRGB(); //[255,255,255]
color.toHSL(); //[100,0,100]
```


## Method
The library has three methods.That is [toRGB](),[toHSL]() and [toHex]().The method will return an array include the transformational color. Why did it return array instead of string that such as 'rgb(0,0,0)'?When you transform the color to HSL,you plan to change the Saturation or Lightness,just to count the array and turn the result to 'hsl(0,0,0)' by yourself immediately.