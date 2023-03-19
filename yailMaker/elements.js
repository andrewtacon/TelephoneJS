/*
2023-01-27 This file breaks me. I don't think I'm going to be able to debug and check everything.
2023-02-12 Wow! I did it. I actually checked every part of this file. Pity I have such a long error list of things to fix or implement now. :(
*/

exports.ELEMENTS = {
    "ball": {
        "properties": {
            "enabled": {
                "description": "Controls whether the Ball moves when its speed is non-zero.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "heading": {
                "description": "The Ball's heading in degrees above the positive x-axis. Zero degrees is toward the right of the screen; 90 degrees is toward the top of the screen.",
                "type": "number",
                "tests": [
                    -90
                ]
            },
            "interval": {
                "description": "The interval in milliseconds at which the Ball's position is updated. For example, if the Interval is 50 and the Speed is 10, then the Ball will move 10 pixels every 50 milliseconds.",
                "type": "number",
                "tests": [
                    100
                ]
            },
            "originAtCenter": {
                "description": "Whether the x- and y-coordinates should represent the center of the Ball.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "paintColor": {
                "description": "The color of the Ball.",
                "type": "color",
                "tests": [
                    "\"FFab793b\""
                ]
            },
            "radius": {
                "description": "The distance from the center of the Ball to its edge.",
                "type": "number",
                "tests": [
                    20
                ]
            },
            "speed": {
                "description": "The speed at which the Ball moves. The Ball moves this many pixels every Interval milliseconds if Enabled is true.",
                "type": "number",
                "tests": [
                    10
                ]
            },
            "visible": {
                "description": "Sets whether sprite should be visible.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "x": {
                "description": "The horizontal coordinate of the Ball, increasing as the Ball moves right. If the property OriginAtCenter is true, the coordinate is for the center of the Ball; otherwise, it is for the leftmost point of the Ball.",
                "type": "number",
                "tests": [
                    150
                ]
            },
            "y": {
                "description": "The vertical coordinate of the Ball, increasing as the Ball moves down. If the property OriginAtCenter is true, the coordinate is for the center of the Ball otherwise, it is for the uppermost point of the Ball.",
                "type": "number",
                "tests": [
                    150
                ]
            },
            "z": {
                "description": "How the Ball should be layered relative to other Balls and ImageSprites, with higher-numbered layers in front of lower-numbered layers.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "originAtCenter",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "originAtCenter",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "bounce": {
                "parameters": {
                    "edge": "number"
                },
                "description": "Makes this Ball bounce, as if off a wall. For normal bouncing, the edge argument should be the one returned by EdgeReached event.",
                "tests": [
                    0
                ]
            },
            "collidingWith": {
                "parameters": {
                    "other": "component"
                },
                "description": "Indicates whether a collision has been registered between this Ball and the passed other sprite.",
                "tests": [
                    "\"componentName\""
                ]
            },
            "moveIntoBounds": {
                "parameters": {},
                "description": "Moves the sprite back in bounds if part of it extends out of bounds, having no effect otherwise. If the sprite is too wide to fit on the canvas, this aligns the left side of the sprite with the left side of the canvas. If the sprite is too tall to fit on the canvas, this aligns the top side of the sprite with the top side of the canvas.",
                "tests": []
            },
            "moveTo": {
                "parameters": {
                    "x": "number",
                    "y": "number"
                },
                "description": "Sets the x and y coordinates of the Ball. If OriginAtCenter is true, the center of the Ball will be placed here. Otherwise, the top left edge of the Ball will be placed at the specified coordinates.",
                "tests": [
                    0,
                    0
                ]
            },
            "moveToPoint": {
                "parameters": {
                    "coordinates": "list"
                },
                "description": "Moves the Ball so that its origin is at the specified x and y coordinates.",
                "tests": [
                    [200,200]
                ]
            },
            "pointInDirection": {
                "parameters": {
                    "x": "number",
                    "y": "number"
                },
                "description": "Turns this Ball to point toward the point with the coordinates (x, y).",
                "tests": [
                    0,
                    0
                ]
            },
            "pointTowards": {
                "parameters": {
                    "target": "component"
                },
                "description": "Turns this Ball to point towards a given target sprite. The new heading will be parallel to the line joining the centerpoints of the two sprites.",
                "tests": [
                    "\"componentName\""
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "collidedWith": {
                "parameters": {
                    "other": "component"
                },
                "description": "Event handler called when two enabled sprites (Balls or ImageSprites) collide. Note that checking for collisions with a rotated ImageSprite currently checks against its unrotated position. Therefore, collision checking will be inaccurate for tall narrow or short wide sprites that are rotated."
            },
            "dragged": {
                "parameters": {
                    "startX": "number",
                    "startY": "number",
                    "prevX": "number",
                    "prevY": "number",
                    "currentX": "number",
                    "currentY": "number"
                },
                "description": "Event handler for Dragged events. On all calls, the starting coordinates are where the screen was first touched, and the \"current\" coordinates describe the endpoint of the current line segment. On the first call within a given drag, the \"previous\" coordinates are the same as the starting coordinates; subsequently, they are the \"current\" coordinates from the prior call. Note that the Ball won't actually move anywhere in response to the Dragged event unless MoveTo is specifically called."
            },
            "edgeReached": {
                "parameters": {
                    "edge": "number"
                },
                "description": "Event handler called when the Ball reaches an edge of the screen. If Bounce is then called with that edge, the sprite will appear to bounce off of the edge it reached. Edge here is represented as an integer that indicates one of eight directions north(1), northeast(2), east(3), southeast(4), south (-1), southwest(-2), west(-3), and northwest(-4)."
            },
            "flung": {
                "parameters": {
                    "x": "number",
                    "y": "number",
                    "speed": "number",
                    "heading": "number",
                    "xvel": "number",
                    "yvel": "number"
                },
                "description": "When a fling gesture (quick swipe) is made on the sprite: provides the (x,y) position of the start of the fling, relative to the upper left of the canvas. Also provides the speed (pixels per millisecond) and heading (0-360 degrees) of the fling, as well as the x velocity and y velocity components of the fling's vector."
            },
            "noLongerCollidingWith": {
                "parameters": {
                    "other": "component"
                },
                "description": "Event indicating that a pair of sprites are no longer colliding."
            },
            "touchDown": {
                "parameters": {
                    "x": "number",
                    "y": "number"
                },
                "description": "When the user begins touching the sprite (places finger on sprite and leaves it there): provides the (x,y) position of the touch, relative to the upper left of the canvas"
            },
            "touchUp": {
                "parameters": {
                    "x": "number",
                    "y": "number"
                },
                "description": "When the user stops touching the sprite (lifts finger after a TouchDown event): provides the (x,y) position of the touch, relative to the upper left of the canvas."
            },
            "touched": {
                "parameters": {
                    "x": "number",
                    "y": "number"
                },
                "description": "When the user touches the sprite and then immediately lifts finger: provides the (x,y) position of the touch, relative to the upper left of the canvas."
            }
        },
        "runTimeName": "Ball"
    },
    "canvas": {
        "properties": {
            "backgroundColor": {
                "description": "Specifies the Canvas's background color as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string, i.e., 0xAARRGGBB. An alpha of 00 indicates fully transparent and FF means opaque. The background color only shows if there is no background image.",
                "type": "color",
                "tests": [
                    "\"FF3304fc\""
                ]
            },
            "backgroundImage": {
                "description": "Specifies the name of a file containing the background image for the Canvas.",
                "type": "string",
                "tests": [
                    `"cat.png"`
                ]
            },
            "backgroundImageinBase64": {
                "description": "Set the background image in Base64 format. This requires API level >= 8. For devices with API level less than 8, setting this will end up with an empty background.",
                "type": "string",
                "tests": [
                    `"Test backgroundImageinBase64"`
                ]
            },
            "extendMovesOutsideCanvas": {
                "description": "Determines whether moves can extend beyond the canvas borders. Default is false. This should normally be false, and the property is provided for backwards compatibility.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontSize": {
                "description": "Specifies the font size of text drawn on the Canvas.",
                "type": "number",
                "tests": [
                    24
                ]
            },
            "height": {
                "description": "Specifies the Canvas's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    400
                ]
            },
            "heightPercent": {
                "description": "Specifies the Canvas's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    65
                ]
            },
            "lineWidth": {
                "description": "Specifies the width of lines drawn on the Canvas.",
                "type": "number",
                "tests": [
                    2
                ]
            },
            "paintColor": {
                "description": "Specifies the paint color as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string, i.e., 0xAARRGGBB. An alpha of 00 indicates fully transparent and FF means opaque.",
                "type": "color",
                "tests": [
                    "\"FF8c2d8c\""
                ]
            },
            "tapThreshold": {
                "description": "Specifies the movement threshold to differentiate a drag from a tap.",
                "type": "number",
                "tests": [
                    5
                ]
            },
            "textAlignment": {
                "description": "Specifies the alignment of the canvas’s text: center, normal (starting at the specified point in DrawText or DrawTextAtAngle), or opposite (ending at the specified point in DrawText or DrawTextAtAngle). ",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "visible": {
                "description": "Specifies whether the Canvas should be visible on the screen. Value is true{",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the Canvas, measured in pixels.",
                "type": "number",
                "tests": [
                    500
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the Canvas as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    100
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "backgroundImageinBase64",
            "heightPercent",
            "widthPercent"
        ],
        "codeNoRead": [
            "backgroundImageinBase64",
            "heightPercent",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "clear": {
                "parameters": {},
                "description": "Clears the canvas, without removing the background image, if one was provided.",
                "tests": []
            },
            "drawArc": {
                "parameters": {
                    "left": "number",
                    "top": "number",
                    "right": "number",
                    "bottom": "number",
                    "startAngle": "number",
                    "sweepAngle": "number",
                    "useCenter": "boolean",
                    "fill": "boolean"
                },
                "description": "Draw an arc on Canvas, by drawing an arc from a specified oval (specified by left, top, right & bottom). Start angle is 0 when heading to the right, and increase when rotate clockwise. When useCenter is true, a sector will be drawed instead of an arc. When fill is true, a filled arc (or sector) will be drawed instead of just an outline.",
                "tests": [
                    0,
                    300,
                    0,
                    300,
                    0,
                    90,
                    true,
                    true
                ]
            },
            "drawCircle": {
                "parameters": {
                    "centerX": "number",
                    "centerY": "number",
                    "radius": "number",
                    "fill": "boolean"
                },
                "description": "Draws a circle (filled in) with the given radius centered at the given coordinates on the Canvas.",
                "tests": [
                    150,
                    150,
                    40,
                    true
                ]
            },
            "drawLine": {
                "parameters": {
                    "x1": "number",
                    "y1": "number",
                    "x2": "number",
                    "y2": "number"
                },
                "description": "Draws a line between the given coordinates on the canvas.",
                "tests": [
                    0,
                    0,
                    300,
                    300
                ]
            },
            "drawPoint": {
                "parameters": {
                    "x": "number",
                    "y": "number"
                },
                "description": "Draws a point at the given coordinates on the canvas.",
                "tests": [
                    300,
                    0
                ]
            },
            "drawShape": {
                "parameters": {
                    "pointList": "list",
                    "fill": "boolean"
                },
                "description": "Draws a shape on the canvas. pointList should be a list contains sub-lists with two number which represents a coordinate. The first point and last point does not need to be the same. e.g. ((x1 y1) (x2 y2) (x3 y3)) When fill is true, the shape will be filled.",
                "tests": [
                    [[1,1], [50,50], [200,0]],
                    true
                ]
            },
            "drawText": {
                "parameters": {
                    "text": "string",
                    "x": "number",
                    "y": "number"
                },
                "description": "Draws the specified text relative to the specified coordinates using the values of the FontSize and TextAlignment properties.",
                "tests": [
                    `"Test text"`,
                    50,
                    50
                ]
            },
            "drawTextAtAngle": {
                "parameters": {
                    "text": "string",
                    "x": "number",
                    "y": "number",
                    "angle": "number"
                },
                "description": "Draws the specified text starting at the specified coordinates at the specified angle using the values of the FontSize and TextAlignment properties.",
                "tests": [
                    `"Test text"`,
                    0,
                    0,
                    90
                ]
            },
            "getBackgroundPixelColor": {
                "parameters": {
                    "x": "number",
                    "y": "number"
                },
                "description": "Gets the color of the given pixel, ignoring sprites.",
                "tests": [
                    30,
                    40
                ]
            },
            "getPixelColor": {
                "parameters": {
                    "x": "number",
                    "y": "number"
                },
                "description": "Gets the color of the given pixel, including sprites.",
                "tests": [
                    40,
                    50
                ]
            },
            "save": {
                "parameters": {},
                "description": "Saves a picture of this Canvas to the device's external storage. If an error occurs, the Screen's ErrorOccurred event will be called.",
                "tests": []
            },
            "saveAs": {
                "parameters": {
                    "fileName": "string"
                },
                "description": "Saves a picture of this Canvas to the device's external storage in the file named fileName. fileName must end with one of \".jpg\", \".jpeg\", or \".png\" (which determines the file type: JPEG, or PNG).",
                "tests": [
                    `"Test fileName"`
                ]
            },
            "setBackgroundPixelColor": {
                "parameters": {
                    "x": "number",
                    "y": "number",
                    "color": "color"
                },
                "description": "Sets the color of the given pixel. This has no effect if the coordinates are out of bounds. The color is a single integer representation of a color. It needs to be created using one of the color.create methods.",
                "tests": [
                    0,
                    0,
                    "\"FFd815f6\""
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "dragged": {
                "parameters": {
                    "startX": "number",
                    "startY": "number",
                    "prevX": "number",
                    "prevY": "number",
                    "currentX": "number",
                    "currentY": "number",
                    "draggedAnySprite": "boolean"
                },
                "description": "When the user does a drag from one point (prevX, prevY) to another (x, y). The pair (startX, startY) indicates where the user first touched the screen, and \"draggedAnySprite\" indicates whether a sprite is being dragged."
            },
            "flung": {
                "parameters": {
                    "x": "number",
                    "y": "number",
                    "speed": "number",
                    "heading": "number",
                    "xvel": "number",
                    "yvel": "number",
                    "flungSprite": "boolean"
                },
                "description": "When a fling gesture (quick swipe) is made on the canvas: provides the (x,y) position of the start of the fling, relative to the upper left of the canvas. Also provides the speed (pixels per millisecond) and heading (0-360 degrees) of the fling, as well as the x velocity and y velocity components of the fling's vector. The value \"flungSprite\" is true if a sprite was located near the the starting point of the fling gesture."
            },
            "touchDown": {
                "parameters": {
                    "x": "number",
                    "y": "number"
                },
                "description": "When the user begins touching the canvas (places finger on canvas and leaves it there): provides the (x,y) position of the touch, relative to the upper left of the canvas"
            },
            "touchUp": {
                "parameters": {
                    "x": "number",
                    "y": "number"
                },
                "description": "When the user stops touching the canvas (lifts finger after a TouchDown event): provides the (x,y) position of the touch, relative to the upper left of the canvas"
            },
            "touched": {
                "parameters": {
                    "x": "number",
                    "y": "number",
                    "touchedAnySprite": "boolean"
                },
                "description": "When the user touches the canvas and then immediately lifts finger: provides the (x,y) position of the touch, relative to the upper left of the canvas. TouchedAnySprite is true if the same touch also touched a sprite, and false otherwise."
            }
        },
        "runTimeName": "Canvas"
    },
    "imagesprite": { 
        "properties": {
            "enabled": {
                "description": "Controls whether the ImageSprite moves when its speed is non-zero.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "heading": {
                "description": "The ImageSprite's heading in degrees above the positive x-axis. Zero degrees is toward the right of the screen; 90 degrees is toward the top of the screen.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "height": {
                "description": "The height of the ImageSprite in pixels.",
                "type": "number",
                "tests": [
                    50
                ]
            },
            "interval": {
                "description": "The interval in milliseconds at which the ImageSprite's position is updated. For example, if the Interval is 50 and the Speed is 10, then the ImageSprite will move 10 pixels every 50 milliseconds.",
                "type": "number",
                "tests": [
                    100
                ]
            },
            "picture": {
                "description": "Specifies the path of the sprite's picture.",
                "type": "string",
                "tests": [
                    `"cat.png"`
                ]
            },
            "rotates": {
                "description": "If true, the sprite image rotates to match the sprite's heading. If false, the sprite image does not rotate when the sprite changes heading. The sprite rotates around its centerpoint.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "speed": {
                "description": "The speed at which the ImageSprite moves. The ImageSprite moves this many pixels every Interval milliseconds if Enabled is true{",
                "type": "number",
                "tests": [
                    10
                ]
            },
            "visible": {
                "description": "Sets whether sprite should be visible.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "The width of the ImageSprite in pixels.",
                "type": "number",
                "tests": [
                    50
                ]
            },
            "x": {
                "description": "The horizontal coordinate of the left edge of the ImageSprite, increasing as the ImageSprite moves right.",
                "type": "number",
                "tests": [
                    200
                ]
            },
            "y": {
                "description": "The vertical coordinate of the top edge of the ImageSprite, increasing as the ImageSprite moves down.",
                "type": "number",
                "tests": [
                    200
                ]
            },
            "z": {
                "description": "How the ImageSprite should be layered relative to other Balls and ImageSprites, with higher-numbered layers in front of lower-numbered layers.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "height",
            "width"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "bounce": {
                "parameters": {
                    "edge": "number"
                },
                "description": "Makes this ImageSprite bounce, as if off a wall. For normal bouncing, the edge argument should be the one returned by EdgeReached.",
                "tests": [
                    0
                ]
            },
            "collidingWith": {
                "parameters": {
                    "other": "component"
                },
                "description": "Indicates whether a collision has been registered between this ImageSprite and the passed other sprite.",
                "tests": [
                    "\"componentName\""
                ]
            },
            "moveIntoBounds": {
                "parameters": {},
                "description": "Moves the sprite back in bounds if part of it extends out of bounds, having no effect otherwise. If the sprite is too wide to fit on the canvas, this aligns the left side of the sprite with the left side of the canvas. If the sprite is too tall to fit on the canvas, this aligns the top side of the sprite with the top side of the canvas.",
                "tests": []
            },
            "moveTo": {
                "parameters": {
                    "x": "number",
                    "y": "number"
                },
                "description": "Moves the ImageSprite so that its left top corner is at the specified x and y coordinates.",
                "tests": [
                    100,
                    100
                ]
            },
            "moveToPoint": {
                "parameters": {
                    "coordinates": "list"
                },
                "description": "Moves the ImageSprite so that its origin is at the specified x and y coordinates.",
                "tests": [
                    [300,300]
                ]
            },
            "pointInDirection": {
                "parameters": {
                    "x": "number",
                    "y": "number"
                },
                "description": "Turns this ImageSprite to point toward the point with the coordinates (x, y).",
                "tests": [
                    0,
                    0
                ]
            },
            "pointTowards": {
                "parameters": {
                    "target": "component"
                },
                "description": "Turns this ImageSprite to point towards a given target sprite. The new heading will be parallel to the line joining the centerpoints of the two sprites.",
                "tests": [
                    "\"componentName\""
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "collidedWith": {
                "parameters": {
                    "other": "component"
                },
                "description": "Event handler called when two enabled sprites (Balls or ImageSprites) collide. Note that checking for collisions with a rotated ImageSprite currently checks against its unrotated position. Therefore, collision checking will be inaccurate for tall narrow or short wide sprites that are rotated."
            },
            "dragged": {
                "parameters": {
                    "startX": "number",
                    "startY": "number",
                    "prevX": "number",
                    "prevY": "number",
                    "currentX": "number",
                    "currentY": "number"
                },
                "description": "Event handler for Dragged events. On all calls, the starting coordinates are where the screen was first touched, and the \"current\" coordinates describe the endpoint of the current line segment. On the first call within a given drag, the \"previous\" coordinates are the same as the starting coordinates; subsequently, they are the \"current\" coordinates from the prior call. Note that the ImageSprite won't actually move anywhere in response to the Dragged event unless MoveTo is specifically called."
            },
            "edgeReached": {
                "parameters": {
                    "edge": "number"
                },
                "description": "Event handler called when the ImageSprite reaches an edge of the screen. If Bounce is then called with that edge, the sprite will appear to bounce off of the edge it reached. Edge here is represented as an integer that indicates one of eight directions north(1), northeast(2), east(3), southeast(4), south (-1), southwest(-2), west(-3), and northwest(-4)."
            },
            "flung": {
                "parameters": {
                    "x": "number",
                    "y": "number",
                    "speed": "number",
                    "heading": "number",
                    "xvel": "number",
                    "yvel": "number"
                },
                "description": "When a fling gesture (quick swipe) is made on the sprite: provides the (x,y) position of the start of the fling, relative to the upper left of the canvas. Also provides the speed (pixels per millisecond) and heading (0-360 degrees) of the fling, as well as the x velocity and y velocity components of the fling's vector."
            },
            "noLongerCollidingWith": {
                "parameters": {
                    "other": "component"
                },
                "description": "Event indicating that a pair of sprites are no longer colliding."
            },
            "touchDown": {
                "parameters": {
                    "x": "number",
                    "y": "number"
                },
                "description": "When the user begins touching the sprite (places finger on sprite and leaves it there): provides the (x,y) position of the touch, relative to the upper left of the canvas"
            },
            "touchUp": {
                "parameters": {
                    "x": "number",
                    "y": "number"
                },
                "description": "When the user stops touching the sprite (lifts finger after a TouchDown event): provides the (x,y) position of the touch, relative to the upper left of the canvas."
            },
            "touched": {
                "parameters": {
                    "x": "number",
                    "y": "number"
                },
                "description": "When the user touches the sprite and then immediately lifts finger: provides the (x,y) position of the touch, relative to the upper left of the canvas."
            }
        },
        "runTimeName": "ImageSprite"
    },
    "activitystarter": {
        "properties": {
            "action": {
                "description": "Specifies the action that will be used to start the activity.",
                "type": "string",
                "tests": [
                    `"Test action"`
                ]
            },
            "activityClass": {
                "description": "Specifies the class part of the specific component that will be started.",
                "type": "string",
                "tests": [
                    `"Test activityClass"`
                ]
            },
            "activityPackage": {
                "description": "Specifies the package part of the specific component that will be started.",
                "type": "string",
                "tests": [
                    `"Test activityPackage"`
                ]
            },
            "dataType": {
                "description": "Specifies the MIME type to pass to the activity.",
                "type": "string",
                "tests": [
                    `"Test dataType"`
                ]
            },
            "dataUri": {
                "description": "Specifies the data URI that will be used to start the activity.",
                "type": "string",
                "tests": [
                    `"Test dataUri"`
                ]
            },
            "extraKey": {
                "description": "Specifies the extra key that will be passed to the activity. Obsolete. Should use Extras instead",
                "type": "string",
                "tests": [
                    `"Test extraKey"`
                ]
            },
            "extraValue": {
                "description": "Specifies the extra value that will be passed to the activity. Obsolete. Should use Extras instead",
                "type": "string",
                "tests": [
                    `"Test extraValue"`
                ]
            },
            "extras": {
                "description": "Returns the list of key-value pairs that will be passed as extra data to the activity. This can be an object or an array of arrays with two elements in each. e.g. {a:1, b:2} or [['a',1],['b',2]] when setting. Return is in the array of arrays form.",
                "type": "array",
                "tests": [
                    {"a":"A","b":"B"}
                ]
            },
            "result": {
                "description": "Returns the result from the activity.",
                "type": "string",
                "tests": [
                    `"Test result"`
                ]
            },
            "resultName": {
                "description": "Specifies the name that will be used to retrieve a result from the activity.",
                "type": "string",
                "tests": [
                    `"Test resultName"`
                ]
            },
            "resultType": {
                "description": "Returns the MIME type from the activity.",
                "type": "string",
                "tests": [
                    `"Test resultType"`
                ]
            },
            "resultUri": {
                "description": "Returns the URI from the activity.",
                "type": "string",
                "tests": [
                    `"Test resultUri"`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "extras",
            "result",
            "resultType",
            "resultUri"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "result",
            "resultType",
            "resultUri",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "resolveActivity": {
                "parameters": {},
                "description": "Returns the name of the activity that corresponds to this ActivityStarter, or an empty string if no corresponding activity can be found.",
                "tests": []
            },
            "startActivity": {
                "parameters": {},
                "description": "Start the activity corresponding to this ActivityStarter.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "activityCanceled": {
                "parameters": {},
                "description": "Event raised if this `ActivityStarter returns because the activity was canceled."
            },
            "afterActivity": {
                "parameters": {
                    "result": "string"
                },
                "description": "Event raised after this ActivityStarter returns."
            }
        },
        "runTimeName": "ActivityStarter"
    },
    "bluetoothclient": {
        "properties": {
            "addressesAndNames": {
                "description": "Returns the list of paired Bluetooth devices. Each element of the returned list is a String consisting of the device's address, a space, and the device's name.",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "available": {
                "description": "Returns true if Bluetooth is available on the device, false otherwise.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "characterEncoding": {
                "description": "Returns the character encoding to use when sending and receiving text.",
                "type": "string",
                "tests": [
                    `"utf8"`
                ]
            },
            "delimiterByte": {
                "description": "Returns the delimiter byte to use when passing a negative number for the numberOfBytes parameter when calling ReceiveText, ReceiveSignedBytes, or ReceiveUnsignedBytes.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "disconnectOnError": {
                "description": "Specifies whether BluetoothClient/BluetoothServer should be disconnected automatically when an error occurs.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "enabled": {
                "description": "Returns true if Bluetooth is enabled, false otherwise.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "highByteFirst": {
                "description": "Specifies whether numbers are sent and received with the most significant byte first.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "isConnected": {
                "description": "Returns true if a connection to a Bluetooth device has been made.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "pollingRate": {
                "description": "Returns the configured polling rate value of the Bluetooth Client.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "secure": {
                "description": "Specifies whether a secure connection should be used.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "addressesAndNames",
            "available",
            "enabled",
            "isConnected"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "addressesAndNames",
            "available",
            "enabled",
            "isConnected",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "bytesAvailableToReceive": {
                "parameters": {},
                "description": "Returns number of bytes available from the input stream.",
                "tests": []
            },
            "connect": {
                "parameters": {
                    "address": "string"
                },
                "description": "Connect to a Bluetooth device with the given address.",
                "tests": [
                    `"Test address"`
                ]
            },
            "connectWithUUID": {
                "parameters": {
                    "address": "string",
                    "uuid": "string"
                },
                "description": "Connect to a Bluetooth device with the given address and a specific UUID.",
                "tests": [
                    `"Test address"`,
                    `"Test uuid"`
                ]
            },
            "disconnect": {
                "parameters": {},
                "description": "Disconnects from the connected Bluetooth device.",
                "tests": []
            },
            "isDevicePaired": {
                "parameters": {
                    "address": "string"
                },
                "description": "Checks whether the Bluetooth device with the given address is paired.",
                "tests": [
                    `"Test address"`
                ]
            },
            "receiveSigned1ByteNumber": {
                "parameters": {},
                "description": "Reads a signed 1-byte number.",
                "tests": []
            },
            "receiveSigned2ByteNumber": {
                "parameters": {},
                "description": "Reads a signed 2-byte number.",
                "tests": []
            },
            "receiveSigned4ByteNumber": {
                "parameters": {},
                "description": "Reads a signed 4-byte number.",
                "tests": []
            },
            "receiveSignedBytes": {
                "parameters": {
                    "numberOfBytes": "number"
                },
                "description": "Reads a number of signed bytes from the input stream and returns them as a List. If numberOfBytes is negative, this method reads until a delimiter byte value is read. The delimiter byte value is included in the returned list.",
                "tests": [
                    0
                ]
            },
            "receiveText": {
                "parameters": {
                    "numberOfBytes": "number"
                },
                "description": "Reads a number of bytes from the input stream and converts them to text. If numberOfBytes is negative, read until a delimiter byte value is read.",
                "tests": [
                    0
                ]
            },
            "receiveUnsigned1ByteNumber": {
                "parameters": {},
                "description": "Reads an unsigned 1-byte number.",
                "tests": []
            },
            "receiveUnsigned2ByteNumber": {
                "parameters": {},
                "description": "Reads an unsigned 2-byte number.",
                "tests": []
            },
            "receiveUnsigned4ByteNumber": {
                "parameters": {},
                "description": "Reads an unsigned 4-byte number.",
                "tests": []
            },
            "receiveUnsignedBytes": {
                "parameters": {
                    "numberOfBytes": "number"
                },
                "description": "Reads a number of unsigned bytes from the input stream and returns them as a List. If numberOfBytes is negative, this method reads until a delimiter byte value is read. The delimiter byte value is included in the returned list.",
                "tests": [
                    0
                ]
            },
            "send1ByteNumber": {
                "parameters": {
                    "number": "string"
                },
                "description": "Decodes the given number String to an integer and writes it as one byte to the output stream. If the number could not be decoded to an integer, or the integer would not fit in one byte, then the Form's ErrorOccurred event is triggered and this method returns without writing any bytes to the output stream.",
                "tests": [
                    "Test number"
                ]
            },
            "send2ByteNumber": {
                "parameters": {
                    "number": "string"
                },
                "description": "Decodes the given number String to an integer and writes it as two bytes to the output stream. If the number could not be decoded to an integer, or the integer would not fit in two bytes, then the Form's ErrorOccurred event is triggered and this method returns without writing any bytes to the output stream.",
                "tests": [
                    "Test number"
                ]
            },
            "send4ByteNumber": {
                "parameters": {
                    "number": "string"
                },
                "description": "Decodes the given number String to an integer and writes it as four bytes to the output stream. If the number could not be decoded to an integer, or the integer would not fit in four bytes, then the Form's ErrorOccurred event is triggered and this method returns without writing any bytes to the output stream.",
                "tests": [
                    "Test number"
                ]
            },
            "sendBytes": {
                "parameters": {
                    "list": "list"
                },
                "description": "Takes each element from the given list, converts it to a String, decodes the String to an integer, and writes it as one byte to the output stream. If an element could not be decoded to an integer, or the integer would not fit in one byte, then the Form's ErrorOccurred event is triggered and this method returns without writing any bytes to the output stream.",
                "tests": [
                    "list"
                ]
            },
            "sendText": {
                "parameters": {
                    "text": "string"
                },
                "description": "Converts the given text to bytes and writes them to the output stream.",
                "tests": [
                    `"Test text"`
                ]
            }
        },
        "events": {},
        "runTimeName": "BluetoothClient"
    },
    "bluetoothserver": {
        "properties": {
            "available": {
                "description": "Returns true if Bluetooth is available on the device, false otherwise.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "characterEncoding": {
                "description": "Returns the character encoding to use when sending and receiving text.",
                "type": "string",
                "tests": [
                    `"UTF-8"`
                ]
            },
            "delimiterByte": {
                "description": "Returns the delimiter byte to use when passing a negative number for the numberOfBytes parameter when calling ReceiveText, ReceiveSignedBytes, or ReceiveUnsignedBytes.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "enabled": {
                "description": "Returns true if Bluetooth is enabled, false otherwise.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "highByteFirst": {
                "description": "Specifies whether numbers are sent and received with the most significant byte first.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "isAccepting": {
                "description": "Returns true if this BluetoothServer component is accepting an incoming connection.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "isConnected": {
                "description": "Returns true if a connection to a Bluetooth device has been made.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "secure": {
                "description": "Specifies whether a secure connection should be used.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "available",
            "enabled",
            "isAccepting",
            "isConnected"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "available",
            "enabled",
            "isAccepting",
            "isConnected",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "acceptConnection": {
                "parameters": {
                    "serviceName": "string"
                },
                "description": "Accept an incoming connection with the Serial Port Profile (SPP).",
                "tests": [
                    `"Test serviceName"`
                ]
            },
            "acceptConnectionWithUUID": {
                "parameters": {
                    "serviceName": "string",
                    "uuid": "string"
                },
                "description": "Accept an incoming connection with a specific UUID.",
                "tests": [
                    `"Test serviceName"`,
                    `"Test uuid"`
                ]
            },
            "bytesAvailableToReceive": {
                "parameters": {},
                "description": "Returns number of bytes available from the input stream.",
                "tests": []
            },
            "disconnect": {
                "parameters": {},
                "description": "Disconnects from the connected Bluetooth device.",
                "tests": []
            },
            "receiveSigned1ByteNumber": {
                "parameters": {},
                "description": "Reads a signed 1-byte number.",
                "tests": []
            },
            "receiveSigned2ByteNumber": {
                "parameters": {},
                "description": "Reads a signed 2-byte number.",
                "tests": []
            },
            "receiveSigned4ByteNumber": {
                "parameters": {},
                "description": "Reads a signed 4-byte number.",
                "tests": []
            },
            "receiveSignedBytes": {
                "parameters": {
                    "numberOfBytes": "number"
                },
                "description": "Reads a number of signed bytes from the input stream and returns them as a List. If numberOfBytes is negative, this method reads until a delimiter byte value is read. The delimiter byte value is included in the returned list.",
                "tests": [
                    0
                ]
            },
            "receiveText": {
                "parameters": {
                    "numberOfBytes": "number"
                },
                "description": "Reads a number of bytes from the input stream and converts them to text. If numberOfBytes is negative, read until a delimiter byte value is read.",
                "tests": [
                    0
                ]
            },
            "receiveUnsigned1ByteNumber": {
                "parameters": {},
                "description": "Reads an unsigned 1-byte number.",
                "tests": []
            },
            "receiveUnsigned2ByteNumber": {
                "parameters": {},
                "description": "Reads an unsigned 2-byte number.",
                "tests": []
            },
            "receiveUnsigned4ByteNumber": {
                "parameters": {},
                "description": "Reads an unsigned 4-byte number.",
                "tests": []
            },
            "receiveUnsignedBytes": {
                "parameters": {
                    "numberOfBytes": "number"
                },
                "description": "Reads a number of unsigned bytes from the input stream and returns them as a List. If numberOfBytes is negative, this method reads until a delimiter byte value is read. The delimiter byte value is included in the returned list.",
                "tests": [
                    0
                ]
            },
            "send1ByteNumber": {
                "parameters": {
                    "number": "string"
                },
                "description": "Decodes the given number String to an integer and writes it as one byte to the output stream. If the number could not be decoded to an integer, or the integer would not fit in one byte, then the Form's ErrorOccurred event is triggered and this method returns without writing any bytes to the output stream.",
                "tests": [
                    `"Test number"`
                ]
            },
            "send2ByteNumber": {
                "parameters": {
                    "number": "string"
                },
                "description": "Decodes the given number String to an integer and writes it as two bytes to the output stream. If the number could not be decoded to an integer, or the integer would not fit in two bytes, then the Form's ErrorOccurred event is triggered and this method returns without writing any bytes to the output stream.",
                "tests": [
                    `"Test number"`
                ]
            },
            "send4ByteNumber": {
                "parameters": {
                    "number": "string"
                },
                "description": "Decodes the given number String to an integer and writes it as four bytes to the output stream. If the number could not be decoded to an integer, or the integer would not fit in four bytes, then the Form's ErrorOccurred event is triggered and this method returns without writing any bytes to the output stream.",
                "tests": [
                    `"Test number"`
                ]
            },
            "sendBytes": {
                "parameters": {
                    "list": "list"
                },
                "description": "Takes each element from the given list, converts it to a String, decodes the String to an integer, and writes it as one byte to the output stream. If an element could not be decoded to an integer, or the integer would not fit in one byte, then the Form's ErrorOccurred event is triggered and this method returns without writing any bytes to the output stream.",
                "tests": [
                    `[1,2,3]`
                ]
            },
            "sendText": {
                "parameters": {
                    "text": "string"
                },
                "description": "Converts the given text to bytes and writes them to the output stream.",
                "tests": [
                    `"Test text"`
                ]
            },
            "stopAccepting": {
                "parameters": {},
                "description": "Stop accepting an incoming connection.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "connectionAccepted": {
                "parameters": {},
                "description": "Indicates that a bluetooth connection has been accepted."
            }
        },
        "runTimeName": "BluetoothServer"
    },
    "serial": {
        "properties": {
            "baudRate": {
                "description": "Returns the current baud rate",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "bufferSize": {
                "description": "Returns the buffer size in bytes",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "isInitialized": {
                "description": "Returns true when the Serial has been initialized.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "isOpen": {
                "description": "Returns true when the Serial connection is open.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "isInitialized",
            "isOpen"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "isInitialized",
            "isOpen",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "closeSerial": {
                "parameters": {},
                "description": "Closes serial connection. Returns true when closed.",
                "tests": []
            },
            "initializeSerial": {
                "parameters": {},
                "description": "Initializes serial connection.",
                "tests": []
            },
            "openSerial": {
                "parameters": {},
                "description": "Opens serial connection. Returns true when opened.",
                "tests": []
            },
            "printSerial": {
                "parameters": {
                    "data": "string"
                },
                "description": "Writes given data to serial, and appends a new line at the end.",
                "tests": [
                    `"Test data"`
                ]
            },
            "readSerial": {
                "parameters": {},
                "description": "Reads data from serial.",
                "tests": []
            },
            "writeSerial": {
                "parameters": {
                    "data": "string"
                },
                "description": "Writes given data to serial.",
                "tests": [
                    `"Test data"`
                ]
            }
        },
        "events": {},
        "runTimeName": "Serial"
    },
    "web": {
        "properties": {
            "allowCookies": {
                "description": "Specifies whether cookies should be allowed",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "requestHeaders": {
                "description": "Sets the request headers.",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "responseFileName": {
                "description": "Specifies the name of the file where the response should be saved. If SaveResponse is true and ResponseFileName is empty, then a new file name will be generated.",
                "type": "string",
                "tests": [
                    `"Test responseFileName"`
                ]
            },
            "saveResponse": {
                "description": "Specifies whether the response should be saved in a file.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "timeout": {
                "description": "Returns the number of milliseconds that each request will wait for a response before they time out. If set to 0, then the request will wait for a response indefinitely.",
                "type": "number",
                "tests": [
                    3000
                ]
            },
            "url": {
                "description": "Specifies the URL.",
                "type": "string",
                "tests": [
                    `"http://www.google.com"`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "requestHeaders"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "buildRequestData": {
                "parameters": {
                    "list": "list"
                },
                "description": "Converts a list of two-element sublists, representing name and value pairs, to a string formatted as application/x-www-form-urlencoded media type, suitable to pass to PostText.",
                "tests": [
                    []
                ]
            },
            "clearCookies": {
                "parameters": {},
                "description": "Clears all cookies for this Web component.",
                "tests": []
            },
            "delete": {
                "parameters": {},
                "description": "Performs an HTTP DELETE request using the Url property and retrieves the response. If the SaveResponse property is true, the response will be saved in a file and the GotFile event will be triggered. The ResponseFileName property can be used to specify the name of the file. If the SaveResponse property is false, the GotText event will be triggered.",
                "tests": []
            },
            "get": {
                "parameters": {},
                "description": "Performs an HTTP GET request using the Url property and retrieves the response. If the SaveResponse property is true, the response will be saved in a file and the GotFile event will be triggered. The ResponseFileName property can be used to specify the name of the file. If the SaveResponse property is false, the GotText event will be triggered.",
                "tests": []
            },
            "htmlTextDecode": {
                "parameters": {
                    "htmlText": "string"
                },
                "description": "Decodes the given HTML text value. HTML Character Entities such as &amp;, &lt;, &gt;, &apos;, and &quot; are changed to &, <, >, ', and \". Entities such as &#xhhhh;, and &#nnnn; are changed to the appropriate characters.",
                "tests": [
                    `"<p>test para</p>>"`
                ]
            },
            "jsonObjectEncode": {
                "parameters": {
                    "jsonObject": "any"
                },
                "description": "Returns the value of a built-in type (i.e., boolean, number, text, list, dictionary) in its JavaScript Object Notation representation. If the value cannot be represented as JSON, the Screen's ErrorOccurred event will be run, if any, and the Web component will return the empty string.",
                "tests": [
                    ["any"]
                ]
            },
            "jsonTextDecode": {
                "parameters": {
                    "jsonText": "string"
                },
                "description": "Decodes the given JSON encoded value to produce a corresponding AppInventor value. A JSON list [x, y, z] decodes to a list (x y z), A JSON object with key A and value B, (denoted as {A:B}) decodes to a list ((A B)), that is, a list containing the two-element list (A B). Use the method JsonTextDecodeWithDictionaries if you would prefer to get back dictionary objects rather than lists-of-lists in the result.",
                "tests": [
                    `"[1,2,3,4,5]"`
                ]
            },
            "jsonTextDecodeWithDictionaries": {
                "parameters": {
                    "jsonText": "string"
                },
                "description": "Decodes the given JSON encoded value to produce a corresponding App Inventor value. A JSON list [x, y, z] decodes to a list (x y z). A JSON Object with name A and value B, denoted as {a: b} decodes to a dictionary with the key a and value b.",
                "tests": [
                    `"[{\\"a\\":1,\\"b\\":2},{\\"c\\":3,\\"d\\":4}]"`
                ]
            },
            "patchFile": {
                "parameters": {
                    "path": "string"
                },
                "description": "Performs an HTTP PATCH request using the Url property and data from the specified file. If the SaveResponse property is true, the response will be saved in a file and the GotFile event will be triggered. The ResponseFileName property can be used to specify the name of the file. If the SaveResponse property is false, the GotText event will be triggered.",
                "tests": [
                    `"Test path"`
                ]
            },
            "patchText": {
                "parameters": {
                    "text": "string"
                },
                "description": "Performs an HTTP PATCH request using the Url property and the specified text. The characters of the text are encoded using UTF-8 encoding. If the SaveResponse property is true, the response will be saved in a file and the GotFile event will be triggered. The responseFileName property can be used to specify the name of the file. If the SaveResponse property is false, the GotText event will be triggered.",
                "tests": [
                    `"Test text"`
                ]
            },
            "patchTextWithEncoding": {
                "parameters": {
                    "text": "string",
                    "encoding": "string"
                },
                "description": "Performs an HTTP PATCH request using the Url property and the specified text. The characters of the text are encoded using the given encoding. If the SaveResponse property is true, the response will be saved in a file and the GotFile event will be triggered. The ResponseFileName property can be used to specify the name of the file. If the SaveResponse property is false, the GotText event will be triggered.",
                "tests": [
                    `"Test text"`,
                    `"UTF-8"`
                ]
            },
            "postFile": {
                "parameters": {
                    "path": "string"
                },
                "description": "Performs an HTTP POST request using the Url property and data from the specified file. If the SaveResponse property is true, the response will be saved in a file and the GotFile event will be triggered. The ResponseFileName property can be used to specify the name of the file. If the SaveResponse property is false, the GotText event will be triggered.",
                "tests": [
                    `"Test path"`
                ]
            },
            "postText": {
                "parameters": {
                    "text": "string"
                },
                "description": "Performs an HTTP POST request using the Url property and the specified text. The characters of the text are encoded using UTF-8 encoding. If the SaveResponse property is true, the response will be saved in a file and the GotFile event will be triggered. The responseFileName property can be used to specify the name of the file. If the SaveResponse property is false, the GotText event will be triggered.",
                "tests": [
                    `"Test text"`
                ]
            },
            "postTextWithEncoding": {
                "parameters": {
                    "text": "string",
                    "encoding": "string"
                },
                "description": "Performs an HTTP POST request using the Url property and the specified text. The characters of the text are encoded using the given encoding. If the SaveResponse property is true, the response will be saved in a file and the GotFile event will be triggered. The ResponseFileName property can be used to specify the name of the file. If the SaveResponse property is false, the GotText event will be triggered.",
                "tests": [
                    `"Test text"`,
                    `"UTF-8"`
                ]
            },
            "putFile": {
                "parameters": {
                    "path": "string"
                },
                "description": "Performs an HTTP PUT request using the Url property and data from the specified file. If the SaveResponse property is true, the response will be saved in a file and the GotFile event will be triggered. The ResponseFileName property can be used to specify the name of the file. If the SaveResponse property is false, the GotText event will be triggered.",
                "tests": [
                    `"Test path"`
                ]
            },
            "putText": {
                "parameters": {
                    "text": "string"
                },
                "description": "Performs an HTTP PUT request using the Url property and the specified text. The characters of the text are encoded using UTF-8 encoding. If the SaveResponse property is true, the response will be saved in a file and the GotFile event will be triggered. The responseFileName property can be used to specify the name of the file. If the SaveResponse property is false, the GotText event will be triggered.",
                "tests": [
                    `"Test text"`
                ]
            },
            "putTextWithEncoding": {
                "parameters": {
                    "text": "string",
                    "encoding": "string"
                },
                "description": "Performs an HTTP PUT request using the Url property and the specified text. The characters of the text are encoded using the given encoding. If the SaveResponse property is true, the response will be saved in a file and the GotFile event will be triggered. The ResponseFileName property can be used to specify the name of the file. If the SaveResponse property is false, the GotText event will be triggered.",
                "tests": [
                    `"Test text"`,
                    `"UTF-8"`
                ]
            },
            "uriDecode": {
                "parameters": {
                    "text": "string"
                },
                "description": "Decodes the encoded text value so that the values aren't URL encoded anymore.",
                "tests": [
                    `"Test text"`
                ]
            },
            "uriEncode": {
                "parameters": {
                    "text": "string"
                },
                "description": "Encodes the given text value so that it can be used in a URL.",
                "tests": [
                    `"Test text"`
                ]
            },
            "XMLTextDecode": {
                "parameters": {
                    "XmlText": "string"
                },
                "description": "Decodes the given XML string to produce a list structure. <tag>string</tag> decodes to a list that contains a pair of tag and string. More generally, if obj1, obj2, ... are tag-delimited XML strings, then <tag>obj1 obj2 ...</tag> decodes to a list that contains a pair whose first element is tag and whose second element is the list of the decoded obj's, ordered alphabetically by tags.",
                "tests": [
                    `"Test XmlText"`
                ]
            },
            "XMLTextDecodeAsDictionary": {
                "parameters": {
                    "XmlText": "string"
                },
                "description": "Decodes the given XML string to produce a dictionary structure. The dictionary includes the special keys $tag, $localName, $namespace, $namespaceUri, $attributes, and $content, as well as a key for each unique tag for every node, which points to a list of elements of the same structure as described here. The $tag key is the full tag name, e.g., foo:bar. The $localName is the local portion of the name (everything after the colon : character). If a namespace is given (everything before the colon : character), it is provided in $namespace and the corresponding URI is given in $namespaceUri. The attributes are stored in a dictionary in $attributes and the child nodes are given as a list under $content.",
                "tests": [
                    `"Test XmlText"`
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "gotFile": {
                "parameters": {
                    "url": "string",
                    "responseCode": "number",
                    "responseType": "string",
                    "fileName": "string"
                },
                "description": "Event indicating that a request has finished."
            },
            "gotText": {
                "parameters": {
                    "url": "string",
                    "responseCode": "number",
                    "responseType": "string",
                    "responseContent": "string"
                },
                "description": "Event indicating that a request has finished."
            },
            "timedOut": {
                "parameters": {
                    "url": "string"
                },
                "description": "Event indicating that a request has timed out."
            }
        },
        "runTimeName": "Web"
    },
    "horizontalarrangement": {
        "properties": {
            "alignHorizontal": {
                "description": "A string that encodes how contents of the HorizontalArrangement are aligned horizontally. The choices are: 'left', 'right', 'center'. Alignment has no effect if the HorizontalArrangement’s Width is Automatic.",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "alignVertical": {
                "description": "A string that encodes how the contents of the HorizontalArrangement are aligned vertically. The choices are: 'top', 'center', 'bottom'. Alignment has no effect if the HorizontalArrangement’s Height is Automatic.",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "backgroundColor": {
                "description": "Specifies the background color of the HorizontalArrangement as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string. If an Image has been set, the color change will not be visible until the Image is removed.",
                "type": "color",
                "tests": [
                    "\"FF46ddb7\""
                ]
            },
            "height": {
                "description": "Specifies the HorizontalArrangement's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    300
                ]
            },
            "heightPercent": {
                "description": "Specifies the HorizontalArrangement's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    50
                ]
            },
            "image": {
                "description": "Specifies the path of the background image of the HorizontalArrangement.",
                "type": "string",
                "tests": [
                    `"cat.png"`
                ]
            },
            "visible": {
                "description": "Specifies whether the HorizontalArrangement should be visible on the screen. Value is true if the HorizontalArrangement is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the HorizontalArrangement, measured in pixels.",
                "type": "number",
                "tests": [
                    500
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the HorizontalArrangement as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    50
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "height",
            "heightPercent",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "heightPercent",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {},
        "events": {},
        "runTimeName": "HorizontalArrangement"
    },
    "horizontalscrollarrangement": {
        "properties": {
            "alignHorizontal": {
                "description": "A string that encodes how contents of the HorizontalScrollArrangement are aligned horizontally. The choices are: 'left', 'right', 'center'. Alignment has no effect if the HorizontalScrollArrangement’s Width is Automatic.",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "alignVertical": {
                "description": "A string that encodes how the contents of the HorizontalScrollArrangement are aligned vertically. The choices are: 'top', 'center', 'bottom'. Alignment has no effect if the HorizontalScrollArrangement’s Height is Automatic.",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "backgroundColor": {
                "description": "Specifies the background color of the HorizontalScrollArrangement as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string. If an Image has been set, the color change will not be visible until the Image is removed.",
                "type": "color",
                "tests": [
                    "\"FF5a58e4\""
                ]
            },
            "height": {
                "description": "Specifies the HorizontalScrollArrangement's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    400
                ]
            },
            "heightPercent": {
                "description": "Specifies the HorizontalScrollArrangement's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    95
                ]
            },
            "image": {
                "description": "Specifies the path of the background image of the HorizontalScrollArrangement.",
                "type": "string",
                "tests": [
                    `"cat.png"`
                ]
            },
            "visible": {
                "description": "Specifies whether the HorizontalScrollArrangement should be visible on the screen. Value is true if the HorizontalScrollArrangement is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the HorizontalScrollArrangement, measured in pixels.",
                "type": "number",
                "tests": [
                    400
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the HorizontalScrollArrangement as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    80
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "height",
            "heightPercent",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "heightPercent",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {},
        "events": {},
        "runTimeName": "HorizontalScrollArrangement"
    },
    "tablearrangement": {
        "properties": {
            "columns": {
                "description": "Determines the number of columns in the table.",
                "type": "number",
                "tests": [
                    3
                ]
            },
            "height": {
                "description": "Specifies the TableArrangement's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    200
                ]
            },
            "heightPercent": {
                "description": "Specifies the TableArrangement's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    90
                ]
            },
            "rows": {
                "description": "Determines the number of rows in the table.",
                "type": "number",
                "tests": [
                    5
                ]
            },
            "visible": {
                "description": "Specifies whether the TableArrangement should be visible on the screen. Value is true if the TableArrangement is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the TableArrangement, measured in pixels.",
                "type": "number",
                "tests": [
                    400
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the TableArrangement as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    65
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "height",
            "heightPercent",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "columns",
            "heightPercent",
            "rows",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "columns",
            "rows",
            "class",
            "id",
            "name"
        ],
        "methods": {},
        "events": {},
        "runTimeName": "TableArrangement"
    },
    "verticalarrangement": {
        "properties": {
            "alignHorizontal": {
                "description": "A string that encodes how contents of the VerticalArrangement are aligned horizontally. The choices are: 'left', 'right', 'center'. Alignment has no effect if the VerticalArrangement’s Width is Automatic.",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "alignVertical": {
                "description": "A string that encodes how the contents of the VerticalArrangement are aligned vertically. The choices are: 'top', 'center', 'bottom'. Alignment has no effect if the VerticalArrangement’s Height is Automatic.",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "backgroundColor": {
                "description": "Specifies the background color of the VerticalArrangement as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string. If an Image has been set, the color change will not be visible until the Image is removed.",
                "type": "color",
                "tests": [
                    "\"FF395379\""
                ]
            },
            "height": {
                "description": "Specifies the VerticalArrangement's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    400
                ]
            },
            "heightPercent": {
                "description": "Specifies the VerticalArrangement's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    45
                ]
            },
            "image": {
                "description": "Specifies the path of the background image of the VerticalArrangement.",
                "type": "string",
                "tests": [
                    `"cat.png"`
                ]
            },
            "visible": {
                "description": "Specifies whether the VerticalArrangement should be visible on the screen. Value is true{",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the VerticalArrangement, measured in pixels.",
                "type": "number",
                "tests": [
                    200
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the VerticalArrangement as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    50
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "height",
            "heightPercent",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "heightPercent",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {},
        "events": {},
        "runTimeName": "VerticalArrangement"
    },
    "verticalscrollarrangement": {
        "properties": {
            "alignHorizontal": {
                "description": "A string that encodes how contents of the VerticalScrollArrangement are aligned horizontally. The choices are: 'left', 'right', 'center'. Alignment has no effect if the VerticalScrollArrangement’s Width is Automatic.",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "alignVertical": {
                "description": "A string that encodes how the contents of the VerticalScrollArrangement are aligned vertically. The choices are: 'top', 'center', 'bottom'. Alignment has no effect if the VerticalScrollArrangement’s Height is Automatic.",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "backgroundColor": {
                "description": "Specifies the background color of the VerticalScrollArrangement as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string. If an Image has been set, the color change will not be visible until the Image is removed.",
                "type": "color",
                "tests": [
                    "\"FFe97220\""
                ]
            },
            "height": {
                "description": "Specifies the VerticalScrollArrangement's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    400
                ]
            },
            "heightPercent": {
                "description": "Specifies the VerticalScrollArrangement's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    80
                ]
            },
            "image": {
                "description": "Specifies the path of the background image of the VerticalScrollArrangement.",
                "type": "string",
                "tests": [
                    `"cat.png"`
                ]
            },
            "visible": {
                "description": "Specifies whether the VerticalScrollArrangement should be visible on the screen. Value is true{",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the VerticalScrollArrangement, measured in pixels.",
                "type": "number",
                "tests": [
                    400
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the VerticalScrollArrangement as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    75
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "height",
            "heightPercent",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "heightPercent",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {},
        "events": {},
        "runTimeName": "VerticalScrollArrangement"
    },

    //start of map 
    "circle": {
        "properties": {
            "description": {
                "description": "Sets or gets the description displayed in the info window. The info window appears when the user taps on the Circle.",
                "type": "string",
                "tests": [
                    `"Test description"`
                ]
            },
            "draggable": {
                "description": "Sets or gets whether or not the user can drag a map feature. This feature is accessed by long-pressing and then dragging the Circle to a new location.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "enableInfobox": {
                "description": "Enables or disables the infobox window display when the user taps the Circle.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fillColor": {
                "description": "Sets or gets the color used to fill in the Circle.",
                "type": "color",
                "tests": [
                    "\"FF2a6186\""
                ]
            },
            "fillOpacity": {
                "description": "Sets or gets the opacity of the color used to fill the Circle. A value of 0.0 will be completely invisible and a value of 1.0 will be completely opaque.",
                "type": "number",
                "tests": [
                    1
                ]
            },
            "latitude": {
                "description": "Sets or gets the latitude of the center of the circle, in degrees. Positive values represent north of the equator and negative values represent south of the equator. To update the latitude and longitude simultaneously, use the SetLocation method.",
                "type": "number",
                "tests": [
                    -27.5083
                ]
            },
            "longitude": {
                "description": "Sets or gets the longitude of the center of the circle, in degrees. Positive values represent east of the prime meridian and negative values represent west of the prime meridian. To update the latitude and longitude simultaneously, use the SetLocation method.",
                "type": "number",
                "tests": [
                    152.9281
                ]
            },
            "radius": {
                "description": "Sets or gets the radius of the circle, in meters.",
                "type": "number",
                "tests": [
                    30
                ]
            },
            "strokeColor": {
                "description": "Sets or gets the color used to outline the Circle.",
                "type": "color",
                "tests": [
                    "\"FF98d5a9\""
                ]
            },
            "strokeOpacity": {
                "description": "Sets or gets the opacity of the outline of the Circle. A value of 0.0 will be invisible and a value of 1.0 will be opaque.",
                "type": "number",
                "tests": [
                    0.5
                ]
            },
            "strokeWidth": {
                "description": "Sets or gets the width of the stroke used to outline the Circle.",
                "type": "number",
                "tests": [
                    1
                ]
            },
            "title": {
                "description": "Sets or gets the title displayed in the info window that appears when the user clicks on the map feature.",
                "type": "string",
                "tests": [
                    `"Test title"`
                ]
            },
            "type": {
                "description": "Returns the type of the feature. For Circles, this returns MapFeature.Circle (\"Circle\").",
                "type": "string",
                "tests": [
                    `"Test type"`
                ]
            },
            "visible": {
                "description": "Specifies whether the Circle should be visible on the screen. Value is true{",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "type"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "type",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "distanceToFeature": {
                "parameters": {
                    "mapFeature": "component",
                    "centroids": "boolean"
                },
                "description": "Computes the distance between the Circle and the given mapFeature. If centroids is true, the computation is done between the centroids of the two features. Otherwise, the distance will be computed between the two features based on the closest points. Further, when centroids is false, this method will return 0 if the Circle intersects or contains the mapFeature. If an error occurs, this method will return -1.",
                "tests": [
                    "\"componentName\"",
                    true
                ]
            },
            "distanceToPoint": {
                "parameters": {
                    "latitude": "number",
                    "longitude": "number",
                    "centroid": "boolean"
                },
                "description": "Computes the distance between the Circle and the given latitude and longitude. If centroids is true, the distance is computed from the center of the Circle to the given point. Otherwise, the distance is computed from the closest point on the Circle to the given point. Further, this method will return 0 if centroids is false and the point is in the Circle. If an error occurs, -1 will be returned.",
                "tests": [
                    -27,
                    152,
                    true
                ]
            },
            "hideInfobox": {
                "parameters": {},
                "description": "Hides the Circle's info box if it is visible. Otherwise, no action is taken.",
                "tests": []
            },
            "setLocation": {
                "parameters": {
                    "latitude": "number",
                    "longitude": "number"
                },
                "description": "Moves the center of the Circle to the given latitude and longitude. This method is more efficient than setting Latitude and Longitude separately.",
                "tests": [
                    -27.5083,
                    152.9281
                ]
            },
            "showInfobox": {
                "parameters": {},
                "description": "Shows the info box for the Circle if it is not visible. Otherwise, this method has no effect. This method can be used to show the info box even if EnableInfobox is false.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "click": {
                "parameters": {},
                "description": "The Click event runs when the user taps on the Circle."
            },
            "drag": {
                "parameters": {},
                "description": "The Drag event runs in response to position updates of the Circle as the user drags it."
            },
            "longClick": {
                "parameters": {},
                "description": "The LongClick event runs when the user presses and holds the Circle and then releases it. This event will only trigger if Draggable is false because it uses the same gesture as StartDrag."
            },
            "startDrag": {
                "parameters": {},
                "description": "The StartDrag event runs when the user presses and holds the Circle and then proceeds to move their finger on the screen. It will be followed by the Drag and StopDrag events."
            },
            "stopDrag": {
                "parameters": {},
                "description": "The StopDrag event runs when the user releases the Circle at the end of a drag."
            }
        },
        "runTimeName": "Circle"
    },
    "featurecollection": { //major issues for this component
        "properties": {
            "features": {
                "description": "Gets the list of features attached to the FeatureCollection (without regard to the value of the feature's Visible{",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "featuresFromGeoJSON": {
                "description": "Populates the feature collection from a string containing GeoJSON content. Given the size of such strings, it is recommended to load the feature collection from assets or the web using the Source property.",
                "type": "string",
                "tests": [
                    `"Test featuresFromGeoJSON"`
                ]
            },
            "height": {
                "description": "Specifies the FeatureCollection's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    100
                ]
            },
            "heightPercent": {
                "description": "Specifies the FeatureCollection's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    50
                ]
            },
            "source": {
                "description": "Specifies the source URL used to populate the feature collection. If the feature collection was not loaded from a URL, this will be the empty string.",
                "type": "string",
                "tests": [
                    `"Test source"`
                ]
            },
            "visible": {
                "description": "Specifies whether the FeatureCollection should be visible on the screen. Value is true{",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the FeatureCollection, measured in pixels.",
                "type": "number",
                "tests": [
                    500
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the FeatureCollection as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    100
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "featuresFromGeoJSON",
            "features",
            "height",
            "heightPercent",
            "source",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "featuresFromGeoJSON",
            "heightPercent",
            "widthPercent",
            "class",
            "id",
            "name",
            "height",
            "heightPercent",
            "width",
            "widthPercent"
        ],
        "codeNoWrite": [
            "featuresFromGeoJSON",
            "source",
            "class",
            "id",
            "name",
            "height",
            "heightPercent",
            "width",
            "widthPercent"
        ],
        "methods": {
            "featureFromDescription": {
                "parameters": {
                    "description": "list"
                },
                "description": "Converts a feature description into an App Inventor map feature. Points are converted into Marker components, LineStrings are converted into LineString components, and Polygons (and MultiPolygons) are converted into Polygon components.",
                "tests": [
                    []
                ]
            },
            "loadFromURL": {
                "parameters": {
                    "url": "string"
                },
                "description": "Loads a feature collection in GeoJSON format from the given url. On success, the event GotFeatures will be raised with the given url and a list of features parsed from the GeoJSON as a list of (key, value) pairs. On failure, the LoadError event will be raised with any applicable HTTP response code and error message.",
                "tests": [
                    `"Test url"`
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "featureClick": {
                "parameters": {
                    "feature": "component"
                },
                "description": "When a feature is clicked, the parent FeatureCollection will also receive a FeatureClick event. The feature parameter indicates which child feature was clicked. This event is run after the Click event on the corresponding feature and after the when any ... Click event if one is provided."
            },
            "featureDrag": {
                "parameters": {
                    "feature": "component"
                },
                "description": "When the user drags a feature, the parent FeatureCollection will also receive a FeatureDrag event. The feature parameter indicates which child feature was dragged. This event is run after the Drag event on the corresponding feature and after the when any ... Drag event if one is provided."
            },
            "featureLongClick": {
                "parameters": {
                    "feature": "component"
                },
                "description": "When a feature is long-clicked, the parent FeatureCollection will also receive a FeatureLongClick event. The feature parameter indicates which child feature was long-clicked. This event is run after the LongClick event on the corresponding feature and after the when any ... LongClick event if one is provided."
            },
            "featureStartDrag": {
                "parameters": {
                    "feature": "component"
                },
                "description": "When the user starts dragging a feature, the parent FeatureCollection will also receive a FeatureStartDrag event. The feature parameter indicates which child feature was dragged. This event is run after the StartDrag event on the corresponding feature and after the when any ... StartDrag event if one is provided."
            },
            "featureStopDrag": {
                "parameters": {
                    "feature": "component"
                },
                "description": "When the user stops dragging a feature, the parent FeatureCollection will also receive a FeatureStopDrag event. The feature parameter indicates which child feature was dragged. This event is run after the StopDrag event on the corresponding feature and after the when any ... StopDrag event if one is provided."
            },
            "gotFeatures": {
                "parameters": {
                    "url": "string",
                    "features": "list"
                },
                "description": "NOTE: If you use this method, it will NOT automatically load the features from the URL onto the map. You will need to use componentName.featureFromDescription(features) method to see them. \n\nThe GotFeatures event is run when when a feature collection is successfully read from the given url. The features parameter will be a list of feature descriptions that can be converted into components using the FeatureFromDescription method."
            },
            "loadError": {
                "parameters": {
                    "url": "string",
                    "responseCode": "number",
                    "errorMessage": "string"
                },
                "description": "The LoadError event is run when an error occurs while processing a feature collection document at the given url. The responseCode parameter will contain an HTTP status code and the errorMessage parameter will contain a detailed error message."
            }
        },
        "runTimeName": "FeatureCollection"
    },
    "linestring": {
        "properties": {
            "description": {
                "description": "Sets or gets the description displayed in the info window. The info window appears when the user taps on the LineString.",
                "type": "string",
                "tests": [
                    `"Test description"`
                ]
            },
            "draggable": {
                "description": "Sets or gets whether or not the user can drag a map feature. This feature is accessed by long-pressing and then dragging the LineString to a new location.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "enableInfobox": {
                "description": "Enables or disables the infobox window display when the user taps the LineString.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "points": {
                "description": "The list of points, as pairs of latitudes and longitudes, in the LineString.",
                "type": "array",
                "tests": [
                    `[[-27.5083, 152.9281],[-27.5, 152.9]]`
                ]
            },
            "pointsFromString": {
                "description": "Set the points of the LineString from a specially-coded character string of the form",
                "type": "string",
                "tests": [
                    `[[-27.507500625014966,152.9271769523621],[-27.50867678932243,152.92896652208583]]`
                ]
            },
            "strokeColor": {
                "description": "Sets or gets the color used to outline the LineString.",
                "type": "color",
                "tests": [
                    "\"FF399866\""
                ]
            },
            "strokeOpacity": {
                "description": "Sets or gets the opacity of the outline of the LineString. A value of 0.0 will be invisible and a value of 1.0 will be opaque.",
                "type": "number",
                "tests": [
                    1
                ]
            },
            "strokeWidth": {
                "description": "Sets or gets the width of the stroke used to outline the LineString.",
                "type": "number",
                "tests": [
                    2
                ]
            },
            "title": {
                "description": "Sets or gets the title displayed in the info window that appears when the user clicks on the map feature.",
                "type": "string",
                "tests": [
                    `"Test title"`
                ]
            },
            "type": {
                "description": "Returns the type of the map feature. For LineString, this returns MapFeature.LineString (\"LineString\").",
                "type": "string",
                "tests": [
                    `"Test type"`
                ]
            },
            "visible": {
                "description": "Specifies whether the LineString should be visible on the screen. Value is true{",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "points",
            "type"
        ],
        "codeNoRead": [
            "pointsFromString",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "type",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "distanceToFeature": {
                "parameters": {
                    "mapFeature": "component",
                    "centroids": "boolean"
                },
                "description": "Computes the distance between the LineString and the given mapFeature. If centroids is true, the computation is done between the centroids of the two features. Otherwise, the distance will be computed between the two features based on the closest points. Further, when centroids is false, this method will return 0 if the LineString intersects or contains the mapFeature. If an error occurs, this method will return -1.",
                "tests": [
                    "\"componentName\"",
                    true
                ]
            },
            "distanceToPoint": {
                "parameters": {
                    "latitude": "number",
                    "longitude": "number",
                    "centroid": "boolean"
                },
                "description": "Computes the distance between the LineString and the given latitude and longitude. If centroids is true, the distance is computed from the center of the LineString to the given point. Otherwise, the distance is computed from the closest point on the LineString to the given point. Further, this method will return 0 if centroids is false and the point is in the LineString. If an error occurs, -1 will be returned.",
                "tests": [
                    -27,
                    153,
                    true
                ]
            },
            "hideInfobox": {
                "parameters": {},
                "description": "Hides the LineString's info box if it is visible. Otherwise, no action is taken.",
                "tests": []
            },
            "showInfobox": {
                "parameters": {},
                "description": "Shows the info box for the LineString if it is not visible. Otherwise, this method has no effect. This method can be used to show the info box even if EnableInfobox is false.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "click": {
                "parameters": {},
                "description": "The Click event runs when the user taps on the LineString."
            },
            "drag": {
                "parameters": {},
                "description": "The Drag event runs in response to position updates of the LineString as the user drags it."
            },
            "longClick": {
                "parameters": {},
                "description": "The LongClick event runs when the user presses and holds the LineString and then releases it. This event will only trigger if Draggable is false because it uses the same gesture as StartDrag."
            },
            "startDrag": {
                "parameters": {},
                "description": "The StartDrag event runs when the user presses and holds the LineString and then proceeds to move their finger on the screen. It will be followed by the Drag and StopDrag events."
            },
            "stopDrag": {
                "parameters": {},
                "description": "The StopDrag event runs when the user releases the LineString at the end of a drag."
            }
        },
        "runTimeName": "LineString"
    },
    "map": {
        "properties": {
            "boundingBox": {
                "description": "Sets or gets the current boundary for the map's drawn view. The value is a list of lists containing the northwest and southeast coordinates of the current view in the form [[North, West], [South, East]].",
                "type": "array",
                "tests": [
                    `[]`
                ]
            },
            "centerFromString": {
                "description": "Set the initial center coordinate of the map. The value is specified as a comma-separated pair of decimal latitude and longitude coordinates, for example, -27.5083, 152.9281. In blocks code, it is recommended for performance reasons to use PanTo with numerical latitude and longitude rather than convert to the string representation for use with this property.",
                "type": "string",
                "tests": [
                    `"-27.5083, 152.9281"`
                ]
            },
            "enablePan": {
                "description": "Enables or disables the ability of the user to move the Map.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "enableRotation": {
                "description": "Enables or disables the two-finger rotation gesture to rotate the Map.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "enableZoom": {
                "description": "Enables or disables the two-finger pinch gesture to zoom the Map.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "features": {
                "description": "Gets the list of features attached to the Map (without regard to the value of the feature's Visible property). This list also includes any features created on the Map by calls to FeatureFromDescription.",
                "type": "array",
                "tests": [
                    `[]`
                ]
            },
            "height": {
                "description": "Specifies the Map's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    400
                ]
            },
            "heightPercent": {
                "description": "Specifies the Map's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    50
                ]
            },
            "latitude": {
                "description": "Gets the latitude of the center of the Map. To change the latitude, use the PanTo method.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "locationSensor": {
                "description": "Uses the provided LocationSensor for user location data rather than the built-in location provider.",
                "type": "string",
                "tests": [
                    `"Test locationSensor"`
                ]
            },
            "longitude": {
                "description": "Gets the longitude of the center of the Map. To change the longitude, use the PanTo method.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "mapType": {
                "description": "Sets or gets the tile layer used to draw the Map background. Defaults to Road. Valid values are 'road', 'aerial' and 'terrain'. Note: Road layers are provided by OpenStreetMap and aerial and terrain layers are provided by the U.S. Geological Survey.",
                "type": "string",
                "tests": [
                    '"road"'
                ]
            },
            "rotation": {
                "description": "Specifies the rotation of the map in decimal degrees, if any.",
                "type": "number",
                "tests": [
                    45
                ]
            },
            "scaleUnits": {
                "description": "Specifies the units used for the scale overlay. The (default) is 'metric' units (km, m) but 'imperial' units (mi, ft) can be also specified",
                "type": "string",
                "tests": [
                    `"metric"`
                ]
            },
            "showCompass": {
                "description": "Specifies whether to a compass overlay on the Map. The compass will be rotated based on the device's orientation if a digital compass is present in hardware.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "showScale": {
                "description": "Shows a scale reference on the map.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "showUser": {
                "description": "Shows or hides an icon indicating the user's current location on the Map. The availability and accuracy of this feature will depend on whether the user has location services enabled and which location providers are available.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "showZoom": {
                "description": "Specifies whether to show zoom controls or not.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "userLatitude": {
                "description": "Returns the user's latitude if ShowUser is enabled.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "userLongitude": {
                "description": "Returns the user's longitude if ShowUser is enabled.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "visible": {
                "description": "Specifies whether the Map should be visible on the screen. Value is true if the Map is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the Map, measured in pixels.",
                "type": "number",
                "tests": [
                    `"parent"`
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the Map as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    95
                ]
            },
            "zoomLevel": {
                "description": "Specifies the zoom level of the map. Valid values of ZoomLevel are dependent on the tile provider and the latitude and longitude of the map. For example, zoom levels are more constrained over oceans than dense city centers to conserve space for storing tiles, so valid values may be 1-7 over ocean and 1-20 over cities. Tile providers may send warning or error tiles if the zoom level is too great for the server to support.",
                "type": "number",
                "tests": [
                    7
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "boundingBox",
            "features",
            "heightPercent",
            "latitude",
            "longitude",
            "userLatitude",
            "userLongitude",
            "widthPercent"
        ],
        "codeNoRead": [
            "centerFromString",
            "heightPercent",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "latitude",
            "longitude",
            "userLatitude",
            "userLongitude",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "createMarker": {
                "parameters": {
                    "latitude": "number",
                    "longitude": "number"
                },
                "description": "Creates a new Marker on the Map at the specified latitude and longitude.",
                "tests": [
                    -27.5083,
                    152.9281
                ]
            },
            "featureFromDescription": {
                "parameters": {
                    "description": "list"
                },
                "description": "Converts a feature description into an App Inventor map feature. Points are converted into Marker components, LineStrings are converted into LineString components, and Polygons (and MultiPolygons) are converted into Polygon components.",
                "tests": [
                    `[]`
                ]
            },
            "loadFromURL": {
                "parameters": {
                    "url": "string"
                },
                "description": "Loads a feature collection in GeoJSON format from the given url. On success, the event GotFeatures will be raised with the given url and a list of features parsed from the GeoJSON as a list of (key, value) pairs. On failure, the LoadError event will be raised with any applicable HTTP response code and error message.",
                "tests": [
                    `"Test url"`
                ]
            },
            "panTo": {
                "parameters": {
                    "latitude": "number",
                    "longitude": "number",
                    "zoom": "number"
                },
                "description": "Pans the map center to the given latitude and longitude and adjust the zoom level to the specified zoom.",
                "tests": [
                    -27.5083,
                    152.9281,
                    8
                ]
            },
            "save": {
                "parameters": {
                    "path": "string"
                },
                "description": "Saves the features on the Map as a GeoJSON file at the specified path.",
                "tests": [
                    `"Test path"`
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "boundsChange": {
                "parameters": {},
                "description": "The BoundsChange event runs when the user changes the map bounds, either by zooming, panning, or rotating the view."
            },
            "doubleTapAtPoint": {
                "parameters": {
                    "latitude": "number",
                    "longitude": "number"
                },
                "description": "The DoubleTapAtPoint runs when the user double taps at a point on the map. The tapped location will be reported in map coordinates via the latitude and longitude parameters."
            },
            "featureClick": {
                "parameters": {
                    "feature": "component"
                },
                "description": "When a feature is clicked, the parent Map will also receive a FeatureClick event. The feature parameter indicates which child feature was clicked. This event is run after the Click event on the corresponding feature and after the when any ... Click event if one is provided."
            },
            "featureDrag": {
                "parameters": {
                    "feature": "component"
                },
                "description": "When the user drags a feature, the parent Map will also receive a FeatureDrag event. The feature parameter indicates which child feature was dragged. This event is run after the Drag event on the corresponding feature and after the when any ... Drag event if one is provided."
            },
            "featureLongClick": {
                "parameters": {
                    "feature": "component"
                },
                "description": "When a feature is long-clicked, the parent Map will also receive a FeatureLongClick event. The feature parameter indicates which child feature was long-clicked. This event is run after the LongClick event on the corresponding feature and after the when any ... LongClick event if one is provided."
            },
            "featureStartDrag": {
                "parameters": {
                    "feature": "component"
                },
                "description": "When the user starts dragging a feature, the parent Map will also receive a FeatureStartDrag event. The feature parameter indicates which child feature was dragged. This event is run after the StartDrag event on the corresponding feature and after the when any ... StartDrag event if one is provided."
            },
            "featureStopDrag": {
                "parameters": {
                    "feature": "component"
                },
                "description": "When the user stops dragging a feature, the parent Map will also receive a FeatureStopDrag event. The feature parameter indicates which child feature was dragged. This event is run after the StopDrag event on the corresponding feature and after the when any ... StopDrag event if one is provided."
            },
            "gotFeatures": {
                "parameters": {
                    "url": "string",
                    "features": "list"
                },
                "description": "The GotFeatures event is run when when a feature collection is successfully read from the given url. The features parameter will be a list of feature descriptions that can be converted into components using the FeatureFromDescription method."
            },
            "invalidPoint": {
                "parameters": {
                    "message": "string"
                },
                "description": "The InvalidPoint event runs when the program encounters an invalid point while processing geographical data. Points are considered invalid when the latitude or longitude for the point is outside the acceptable range ([-90, 90] and [-180, 180], respectively). The message parameter will contain an explanation for the error."
            },
            "loadError": {
                "parameters": {
                    "url": "string",
                    "responseCode": "number",
                    "errorMessage": "string"
                },
                "description": "The LoadError event is run when an error occurs while processing a feature collection document at the given url. The responseCode parameter will contain an HTTP status code and the errorMessage parameter will contain a detailed error message."
            },
            "longPressAtPoint": {
                "parameters": {
                    "latitude": "number",
                    "longitude": "number"
                },
                "description": "The LongPressAtPoint runs when the user long-presses at a point on the map without moving their finger (which would trigger a drag). The location of the long-press will be reported in map coordinates via the latitude and longitude parameters."
            },
            "ready": {
                "parameters": {},
                "description": "The Ready event runs once the Map has been initialized and is ready for user interaction."
            },
            "tapAtPoint": {
                "parameters": {
                    "latitude": "number",
                    "longitude": "number"
                },
                "description": "The TapAtPoint runs when the user taps at a point on the map. The tapped location will be reported in map coordinates via the latitude and longitude parameters."
            },
            "zoomChange": {
                "parameters": {},
                "description": "The ZoomChange event runs when the user has changed the zoom level of the map, such as by pinching or double-tapping to zoom."
            }
        },
        "runTimeName": "Map"
    },
    "marker": {
        "properties": {
            "anchorHorizontal": {
                "description": "Sets or gets the horizontal offset of the Marker center relative to its image. Valid values are 'left', 'right' and 'center'",
                "type": "string",
                "tests": [
                    `"right"`
                ]
            },
            "anchorVertical": {
                "description": "Sets or gets the vertical offset of the Marker center relative to its image. Valid values are 'top', 'center' and 'bottom'",
                "type": "string",
                "tests": [
                    `"bottom"`
                ]
            },
            "description": {
                "description": "Sets or gets the description displayed in the info window. The info window appears when the user taps on the Marker.",
                "type": "string",
                "tests": [
                    `"Test description"`
                ]
            },
            "draggable": {
                "description": "Sets or gets whether or not the user can drag a map feature. This feature is accessed by long-pressing and then dragging the Marker to a new location.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "enableInfobox": {
                "description": "Enables or disables the infobox window display when the user taps the Marker.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fillColor": {
                "description": "Sets or gets the color used to fill in the Marker.",
                "type": "color",
                "tests": [
                    "\"FF660cce\""
                ]
            },
            "fillOpacity": {
                "description": "Sets or gets the opacity of the color used to fill the Marker. A value of 0.0 will be completely invisible and a value of 1.0 will be completely opaque.",
                "type": "number",
                "tests": [
                    1
                ]
            },
            "height": {
                "description": "Specifies the Marker's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    50
                ]
            },
            "heightPercent": {
                "description": "Specifies the Marker's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    10
                ]
            },
            "imageAsset": {
                "description": "Specifies the image shown for the Marker. If set to the empty string \"\", then the default marker icon will be used.",
                "type": "string",
                "tests": [
                    `"cat.png"`
                ]
            },
            "latitude": {
                "description": "Sets or gets the latitude of the Marker, in degrees, with positive values representing north of the equator and negative values representing south of the equator. To update the Latitude and Longitude simultaneously, use the SetLocation method.",
                "type": "number",
                "tests": [
                    -27.5083
                ]
            },
            "longitude": {
                "description": "Sets or gets the longitude of the Marker, in degrees, with positive values representing east of the prime meridian and negative values representing west of the prime meridian. To update the Latitude and Longitude simultaneously, use the SetLocation method.",
                "type": "number",
                "tests": [
                    152.9281
                ]
            },
            "strokeColor": {
                "description": "Sets or gets the color used to outline the Marker.",
                "type": "color",
                "tests": [
                    "\"FFbf50e3\""
                ]
            },
            "strokeOpacity": {
                "description": "Sets or gets the opacity of the outline of the Marker. A value of 0.0 will be invisible and a value of 1.0 will be opaque.",
                "type": "number",
                "tests": [
                    1
                ]
            },
            "strokeWidth": {
                "description": "Sets or gets the width of the stroke used to outline the Marker.",
                "type": "number",
                "tests": [
                    4
                ]
            },
            "title": {
                "description": "Sets or gets the title displayed in the info window that appears when the user clicks on the map feature.",
                "type": "string",
                "tests": [
                    `"Test title"`
                ]
            },
            "type": {
                "description": "Return the type of the map feature. For Marker, this returns the text \"Marker\".",
                "type": "string",
                "tests": [
                    `"Test type"`
                ]
            },
            "visible": {
                "description": "Specifies whether the Marker should be visible on the screen. Value is true{",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the Marker, measured in pixels.",
                "type": "number",
                "tests": [
                    50
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the Marker as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    25
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "height",
            "heightPercent",
            "type",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "heightPercent",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "type",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "bearingToFeature": {
                "parameters": {
                    "mapFeature": "component",
                    "centroids": "boolean"
                },
                "description": "Returns the bearing from the Marker to the given map feature, in degrees from due north. If the centroids parameter is true, the bearing will be to the center of the map feature. Otherwise, the bearing will be computed to the point in the feature nearest the Marker.",
                "tests": [
                    "\"componentName\"",
                    true
                ]
            },
            "bearingToPoint": {
                "parameters": {
                    "latitude": "number",
                    "longitude": "number"
                },
                "description": "Returns the bearing from the Marker to the given latitude and longitude, in degrees from due north.",
                "tests": [
                    -27, 152
                ]
            },
            "distanceToFeature": {
                "parameters": {
                    "mapFeature": "component",
                    "centroids": "boolean"
                },
                "description": "Computes the distance between the Marker and the given mapFeature. If centroids is true, the computation is done between the centroids of the two features. Otherwise, the distance will be computed between the two features based on the closest points. Further, when centroids is false, this method will return 0 if the Marker intersects or contains the mapFeature. If an error occurs, this method will return -1.",
                "tests": [
                    "\"componentName\"",
                    true
                ]
            },
            "distanceToPoint": {
                "parameters": {
                    "latitude": "number",
                    "longitude": "number"
                },
                "description": "Compute the distance, in meters, between a Marker and a latitude, longitude point.",
                "tests": [
                    -27,
                    152
                ]
            },
            "hideInfobox": {
                "parameters": {},
                "description": "Hides the Marker's info box if it is visible. Otherwise, no action is taken.",
                "tests": []
            },
            "setLocation": {
                "parameters": {
                    "latitude": "number",
                    "longitude": "number"
                },
                "description": "Sets the location of the Marker.",
                "tests": [
                    -27.5083, 152.9281
                ]
            },
            "showInfobox": {
                "parameters": {},
                "description": "Shows the info box for the Marker if it is not visible. Otherwise, this method has no effect. This method can be used to show the info box even if EnableInfobox is false.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "click": {
                "parameters": {},
                "description": "The Click event runs when the user taps on the Marker."
            },
            "drag": {
                "parameters": {},
                "description": "The Drag event runs in response to position updates of the Marker as the user drags it."
            },
            "longClick": {
                "parameters": {},
                "description": "The LongClick event runs when the user presses and holds the Marker and then releases it. This event will only trigger if Draggable is false because it uses the same gesture as StartDrag."
            },
            "startDrag": {
                "parameters": {},
                "description": "The StartDrag event runs when the user presses and holds the Marker and then proceeds to move their finger on the screen. It will be followed by the Drag and StopDrag events."
            },
            "stopDrag": {
                "parameters": {},
                "description": "The StopDrag event runs when the user releases the Marker at the end of a drag."
            }
        },
        "runTimeName": "Marker"
    },
    "navigation": {
        "properties": {
            "apiKey": {
                "description": "API Key for Open Route Service. Obtain an API key at https://openrouteservice.org.",
                "type": "string",
                "tests": [
                    '"Test apiKey"'
                ]
            },
            "endLatitude": {
                "description": "The latitude of the end location.",
                "type": "number",
                "tests": [
                    -27
                ]
            },
            "endLocation": {
                "description": "Set the end location.",
                "type": "string",
                "tests": [
                    `getComponent(circle1)`
                ]
            },
            "endLongitude": {
                "description": "The longitude of the end location.",
                "type": "number",
                "tests": [
                    152
                ]
            },
            "language": {
                "description": "The language to use for textual directions. Default is \"en\" for English.",
                "type": "string",
                "tests": [
                    `"en"`
                ]
            },
            "responseContent": {
                "description": "The raw response from the server. This can be used to access more details beyond what the GotDirections event provides.",
                "type": "object",
                "tests": [
                    {}
                ]
            },
            "startLatitude": {
                "description": "The latitude of the start location.",
                "type": "number",
                "tests": [
                    -27.5083
                ]
            },
            "startLocation": {
                "description": "Set the start location.",
                "type": "string",
                "tests": [
                    `getComponent(circle2)`
                ]
            },
            "startLongitude": {
                "description": "The longitude of the start location.",
                "type": "number",
                "tests": [
                    152.9281
                ]
            },
            "transportationMethod": {
                "description": "The transportation method used for determining the route. Valid options are 'walking', 'driving', 'cycling', 'wheelchair'",
                "type": "string",
                "tests": [
                    `"driving"`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "endLocation",
            "responseContent",
            "startLocation"
        ],
        "codeNoRead": [
            "apiKey",
            "endLocation",
            "startLocation",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "responseContent",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "requestDirections": {
                "parameters": {},
                "description": "Request directions from the routing service using the values of StartLatitude, StartLongitude, EndLatitude, and EndLongitude. On success, the GotDirections event block will run. If an error occurs, the error will be reported via the Screen's ErrorOccurred event.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "gotDirections": {
                "parameters": {
                    "directions": "list",
                    "points": "list",
                    "distance": "number",
                    "duration": "number"
                },
                "description": "Event indicating that a request has finished and has returned data. The following parameters are provided:- directions: A list of text directions, such as \"Turn left at Massachusetts Avenue\"., points: A list of (latitude, longitude) points that represent the path to take. This can be passed to LineString's Points to draw the line on a Map. distance: Estimated distance for the route, in meters. duration: Estimated duration for the route, in seconds."
            }
        },
        "runTimeName": "Navigation"
    },
    "polygon": {
        "properties": {
            "description": {
                "description": "Sets or gets the description displayed in the info window. The info window appears when the user taps on the Polygon.",
                "type": "string",
                "tests": [
                    `"Test description"`
                ]
            },
            "draggable": {
                "description": "Sets or gets whether or not the user can drag a map feature. This feature is accessed by long-pressing and then dragging the Polygon to a new location.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "enableInfobox": {
                "description": "Enables or disables the infobox window display when the user taps the Polygon.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fillColor": {
                "description": "Sets or gets the color used to fill in the Polygon.",
                "type": "color",
                "tests": [
                    "\"FFad6733\""
                ]
            },
            "fillOpacity": {
                "description": "Sets or gets the opacity of the color used to fill the Polygon. A value of 0.0 will be completely invisible and a value of 1.0 will be completely opaque.",
                "type": "number",
                "tests": [
                    1
                ]
            },
            "holePoints": {
                "description": "Specifies the points of any holes in the Polygon. The HolePoints property is a list of lists, with each sublist containing (latitude, longitude) points representing a hole.",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "holePointsFromString": {
                "description": "Specifies holes in a Polygonfrom a GeoJSON string. In contrast to HolePoints, the longitude of each point comes before the latitude as stated in the GeoJSON specification.",
                "type": "string",
                "tests": [
                    `""`
                ]
            },
            "points": {
                "description": "Specifies the Points used for drawing the Polygon. The Points are specified as a list of lists containing latitude and longitude values, such as [[lat1, long1], [lat2, long2], ...].",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "pointsFromString": {
                "description": "Specifies the points for the Polygon from a GeoJSON string. Unlike Points, this property expects that the longitude comes first in the point rather than the latitude.",
                "type": "string",
                "tests": [
                    `""`
                ]
            },
            "strokeColor": {
                "description": "Sets or gets the color used to outline the Polygon.",
                "type": "color",
                "tests": [
                    "\"FF0e7a52\""
                ]
            },
            "strokeOpacity": {
                "description": "Sets or gets the opacity of the outline of the Polygon. A value of 0.0 will be invisible and a value of 1.0 will be opaque.",
                "type": "number",
                "tests": [
                    1
                ]
            },
            "strokeWidth": {
                "description": "Sets or gets the width of the stroke used to outline the Polygon.",
                "type": "number",
                "tests": [
                    2
                ]
            },
            "title": {
                "description": "Sets or gets the title displayed in the info window that appears when the user clicks on the map feature.",
                "type": "string",
                "tests": [
                    `"Test title"`
                ]
            },
            "type": {
                "description": "Returns the type of the feature. For polygons, this returns MapFeature.Polygon (\"Polygon\").",
                "type": "string",
                "tests": [
                    `"Test type"`
                ]
            },
            "visible": {
                "description": "Specifies whether the Polygon should be visible on the screen. Value is true{",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "holePoints",
            "points",
            "type"
        ],
        "codeNoRead": [
            "holePointsFromString",
            "pointsFromString",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "type",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "centroid": {
                "parameters": {},
                "description": "Gets the centroid of the Polygon as a (latitude, longitude) pair.",
                "tests": []
            },
            "distanceToFeature": {
                "parameters": {
                    "mapFeature": "component",
                    "centroids": "boolean"
                },
                "description": "Computes the distance between the Polygon and the given mapFeature. If centroids is true, the computation is done between the centroids of the two features. Otherwise, the distance will be computed between the two features based on the closest points. Further, when centroids is false, this method will return 0 if the Polygon intersects or contains the mapFeature. If an error occurs, this method will return -1.",
                "tests": [
                    "\"componentName\"",
                    true
                ]
            },
            "distanceToPoint": {
                "parameters": {
                    "latitude": "number",
                    "longitude": "number",
                    "centroid": "boolean"
                },
                "description": "Computes the distance between the Polygon and the given latitude and longitude. If centroids is true, the distance is computed from the center of the Polygon to the given point. Otherwise, the distance is computed from the closest point on the Polygon to the given point. Further, this method will return 0 if centroids is false and the point is in the Polygon. If an error occurs, -1 will be returned.",
                "tests": [
                    -27,
                    152,
                    true
                ]
            },
            "hideInfobox": {
                "parameters": {},
                "description": "Hides the Polygon's info box if it is visible. Otherwise, no action is taken.",
                "tests": []
            },
            "showInfobox": {
                "parameters": {},
                "description": "Shows the info box for the Polygon if it is not visible. Otherwise, this method has no effect. This method can be used to show the info box even if EnableInfobox is false.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "click": {
                "parameters": {},
                "description": "The Click event runs when the user taps on the Polygon."
            },
            "drag": {
                "parameters": {},
                "description": "The Drag event runs in response to position updates of the Polygon as the user drags it."
            },
            "longClick": {
                "parameters": {},
                "description": "The LongClick event runs when the user presses and holds the Polygon and then releases it. This event will only trigger if Draggable is false because it uses the same gesture as StartDrag."
            },
            "startDrag": {
                "parameters": {},
                "description": "The StartDrag event runs when the user presses and holds the Polygon and then proceeds to move their finger on the screen. It will be followed by the Drag and StopDrag events."
            },
            "stopDrag": {
                "parameters": {},
                "description": "The StopDrag event runs when the user releases the Polygon at the end of a drag."
            }
        },
        "runTimeName": "Polygon"
    },
    "rectangle": {
        "properties": {
            "description": {
                "description": "Sets or gets the description displayed in the info window. The info window appears when the user taps on the Rectangle.",
                "type": "string",
                "tests": [
                    `"Test description"`
                ]
            },
            "draggable": {
                "description": "Sets or gets whether or not the user can drag a map feature. This feature is accessed by long-pressing and then dragging the Rectangle to a new location.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "eastLongitude": {
                "description": "Specifies the east-most edge of the Rectangle, in decimal degrees east of the prime meridian.",
                "type": "number",
                "tests": [
                    152.5
                ]
            },
            "enableInfobox": {
                "description": "Enables or disables the infobox window display when the user taps the Rectangle.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fillColor": {
                "description": "Sets or gets the color used to fill in the Rectangle.",
                "type": "color",
                "tests": [
                    "\"FF224bd4\""
                ]
            },
            "fillOpacity": {
                "description": "Sets or gets the opacity of the color used to fill the Rectangle. A value of 0.0 will be completely invisible and a value of 1.0 will be completely opaque.",
                "type": "number",
                "tests": [
                    1
                ]
            },
            "northLatitude": {
                "description": "Specifies the north-most edge of the Rectangle, in decimal degrees north of the equator.",
                "type": "number",
                "tests": [
                    -27.5
                ]
            },
            "southLatitude": {
                "description": "Specifies the west-most edge of the Rectangle, in decimal degrees east of the prime meridian.",
                "type": "number",
                "tests": [
                    -27.6
                ]
            },
            "strokeColor": {
                "description": "Sets or gets the color used to outline the Rectangle.",
                "type": "color",
                "tests": [
                    "\"FF0980f5\""
                ]
            },
            "strokeOpacity": {
                "description": "Sets or gets the opacity of the outline of the Rectangle. A value of 0.0 will be invisible and a value of 1.0 will be opaque.",
                "type": "number",
                "tests": [
                    1
                ]
            },
            "strokeWidth": {
                "description": "Sets or gets the width of the stroke used to outline the Rectangle.",
                "type": "number",
                "tests": [
                    1
                ]
            },
            "title": {
                "description": "Sets or gets the title displayed in the info window that appears when the user clicks on the map feature.",
                "type": "string",
                "tests": [
                    `"Test title"`
                ]
            },
            "type": {
                "description": "Returns the type of the feature. For rectangles, this returns MapFeature.Rectangle (\"Rectangle\").",
                "type": "string",
                "tests": [
                    `"Test type"`
                ]
            },
            "visible": {
                "description": "Specifies whether the Rectangle should be visible on the screen. Value is true{",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "westLongitude": {
                "description": "Specifies the south-most edge of the Rectangle, in decimal degrees south of the equator.",
                "type": "number",
                "tests": [
                    153
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "type"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "type",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "bounds": {
                "parameters": {},
                "description": "Returns the bounding box of the Rectangle in the format ((North West) (South East)).",
                "tests": []
            },
            "center": {
                "parameters": {},
                "description": "Returns the center of the Rectangle as a list of the form (Latitude Longitude).",
                "tests": []
            },
            "distanceToFeature": {
                "parameters": {
                    "mapFeature": "component",
                    "centroids": "boolean"
                },
                "description": "Computes the distance between the Rectangle and the given mapFeature. If centroids is true, the computation is done between the centroids of the two features. Otherwise, the distance will be computed between the two features based on the closest points. Further, when centroids is false, this method will return 0 if the Rectangle intersects or contains the mapFeature. If an error occurs, this method will return -1.",
                "tests": [
                    "\"componentName\"",
                    true
                ]
            },
            "distanceToPoint": {
                "parameters": {
                    "latitude": "number",
                    "longitude": "number",
                    "centroid": "boolean"
                },
                "description": "Computes the distance between the Rectangle and the given latitude and longitude. If centroids is true, the distance is computed from the center of the Rectangle to the given point. Otherwise, the distance is computed from the closest point on the Rectangle to the given point. Further, this method will return 0 if centroids is false and the point is in the Rectangle. If an error occurs, -1 will be returned.",
                "tests": [
                    -27.5083,
                    152.9281,
                    true
                ]
            },
            "hideInfobox": {
                "parameters": {},
                "description": "Hides the Rectangle's info box if it is visible. Otherwise, no action is taken.",
                "tests": []
            },
            "setCenter": {
                "parameters": {
                    "latitude": "number",
                    "longitude": "number"
                },
                "description": "Move the Rectangle to be centered on the given latitude and longitude, attempting to keep the width and height (in meters) as equal as possible adjusting for changes in latitude.",
                "tests": [
                    -27.5,
                    152.9
                ]
            },
            "showInfobox": {
                "parameters": {},
                "description": "Shows the info box for the Rectangle if it is not visible. Otherwise, this method has no effect. This method can be used to show the info box even if EnableInfobox is false.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "click": {
                "parameters": {},
                "description": "The Click event runs when the user taps on the Rectangle."
            },
            "drag": {
                "parameters": {},
                "description": "The Drag event runs in response to position updates of the Rectangle as the user drags it."
            },
            "longClick": {
                "parameters": {},
                "description": "The LongClick event runs when the user presses and holds the Rectangle and then releases it. This event will only trigger if Draggable is false because it uses the same gesture as StartDrag."
            },
            "startDrag": {
                "parameters": {},
                "description": "The StartDrag event runs when the user presses and holds the Rectangle and then proceeds to move their finger on the screen. It will be followed by the Drag and StopDrag events."
            },
            "stopDrag": {
                "parameters": {},
                "description": "The StopDrag event runs when the user releases the Rectangle at the end of a drag."
            }
        },
        "runTimeName": "Rectangle"
    },
    "camcorder": {
        "properties": {
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "recordVideo": {
                "parameters": {},
                "description": "Records a video, then raises the AfterRecording event.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "afterRecording": {
                "parameters": {
                    "clip": "string"
                },
                "description": "Indicates that a video was recorded with the camera and provides the path to the stored video."
            }
        },
        "runTimeName": "Camcorder"
    },
    "camera": {
        "properties": {
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "takePicture": {
                "parameters": {},
                "description": "Takes a picture, then raises the AfterPicture event.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "afterPicture": {
                "parameters": {
                    "image": "string"
                },
                "description": "Called after the picture is taken. The text argument image is the path that can be used to locate the image on the phone."
            }
        },
        "runTimeName": "Camera"
    },
    "imagepicker": { 
        "properties": {
            "backgroundColor": {
                "description": "Specifies the ImagePicker's background color as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string. If an Image has been set, the color change will not be visible until the Image is removed.",
                "type": "color",
                "tests": [
                    "\"FFb78895\""
                ]
            },
            "enabled": {
                "description": "Specifies whether the ImagePicker should be active and clickable.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontBold": {
                "description": "Specifies whether the text of the ImagePicker should be bold. Some fonts do not support bold.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontItalic": {
                "description": "Specifies whether the text of the ImagePicker should be italic. Some fonts do not support italic.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontSize": {
                "description": "Specifies the text font size of the ImagePicker, measured in sp(scale-independent pixels).",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "fontTypeface": {
                "description": "Specifies the text font face of the ImagePicker as 'serif', 'sans serif', or 'monospace'.",
                "type": "string",
                "tests": [
                    `"monospace"`
                ]
            },
            "height": {
                "description": "Specifies the ImagePicker's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    200
                ]
            },
            "heightPercent": {
                "description": "Specifies the ImagePicker's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    `"25%"`
                ]
            },
            "image": {
                "description": "Specifies the path of the ImagePicker's image. If there is both an Image and a BackgroundColor specified, only the Image will be visible.",
                "type": "string",
                "tests": [
                    `"cat.png"`
                ]
            },
            "selection": {
                "description": "Path to the file containing the image that was selected.",
                "type": "string",
                "tests": [
                    `"Test selection"`
                ]
            },
            "shape": {
                "description": "Specifies the shape of the ImagePicker. The valid values for this property are 'round', 'rectangle' and 'oval'. The Shape will not be visible if an Image is used.",
                "type": "string",
                "tests": [
                    `"round"`
                ]
            },
            "showFeedback": {
                "description": "Specifies if a visual feedback should be shown when a ImagePicker with an assigned Image is pressed.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "text": {
                "description": "Specifies the text displayed by the ImagePicker.",
                "type": "string",
                "tests": [
                    `"Test text"`
                ]
            },
            "textAlignment": {
                "description": "Specifies the alignment of the ImagePicker's text. Valid values are 'left', 'right' and 'center'.",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "textColor": {
                "description": "Specifies the text color of the ImagePicker as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string.",
                "type": "color",
                "tests": [
                    "\"FF0d8b8f\""
                ]
            },
            "visible": {
                "description": "Specifies whether the ImagePicker should be visible on the screen. Value is true{",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the ImagePicker, measured in pixels.",
                "type": "number",
                "tests": [
                    300
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the ImagePicker as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    `"45%"`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "height",
            "heightPercent",
            "selection",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "fontTypeface",
            "heightPercent",
            "shape",
            "textAlignment",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "fontTypeface",
            "selection",
            "shape",
            "textAlignment",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "open": {
                "parameters": {},
                "description": "Opens the ImagePicker, as though the user clicked on it.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "afterPicking": {
                "parameters": {},
                "description": "Event to be raised after the ImagePicker activity returns its result and the properties have been filled in."
            },
            "beforePicking": {
                "parameters": {},
                "description": "Event to raise when the ImagePicker is clicked or the picker is shown using the Open method. This event occurs before the picker is displayed, and can be used to prepare the picker before it is shown."
            },
            "gotFocus": {
                "parameters": {},
                "description": "Indicates the cursor moved over the ImagePicker so it is now possible to click it."
            },
            "lostFocus": {
                "parameters": {},
                "description": "Indicates the cursor moved away from the ImagePicker so it is now no longer possible to click it."
            },
            "touchDown": {
                "parameters": {},
                "description": "Indicates that the ImagePicker was pressed down."
            },
            "touchUp": {
                "parameters": {},
                "description": "Indicates that the ImagePicker has been released."
            }
        },
        "runTimeName": "ImagePicker"
    },
    "player": { 
        "properties": {
            "isPlaying": {
                "description": "Reports whether the media is playing.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "loop": {
                "description": "If true, the Player will loop when it plays. Setting Loop while the player is playing will affect the current playing.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "playOnlyInForeground": {
                "description": "If true, the Player will pause playing when leaving the current screen; if false (default option), the Player continues playing whenever the current screen is displaying or not.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "source": {
                "description": "Sets the audio source.",
                "type": "string",
                "tests": [
                    `"/storage/emulated/0/Android/data/edu.mit.appinventor.aicompanion3/files/My Documents/Recordings/app_inventor_1675592812960.3gp"`
                ]
            },
            "volume": {
                "description": "Sets the volume property to a number between 0 and 100.",
                "type": "number",
                "tests": [
                    100
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "isPlaying"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name",
            "volume"
        ],
        "codeNoWrite": [
            "isPlaying",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "pause": {
                "parameters": {},
                "description": "Suspends playing the media if it is playing.",
                "tests": []
            },
            "start": {
                "parameters": {},
                "description": "Plays the media. If it was previously paused, the playing is resumed. If it was previously stopped, it starts from the beginning.",
                "tests": []
            },
            "stop": {
                "parameters": {},
                "description": "Stops playing the media and seeks to the beginning of the song.",
                "tests": []
            },
            "vibrate": {
                "parameters": {
                    "milliseconds": "number"
                },
                "description": "Vibrates for specified number of milliseconds.",
                "tests": [
                    1000
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "completed": {
                "parameters": {},
                "description": "Indicates that the media has reached the end"
            },
            "otherPlayerStarted": {
                "parameters": {},
                "description": "This event is signaled when another player has started (and the current player is playing or paused, but not stopped)."
            }
        },
        "runTimeName": "Player"
    },
    "sound": {
        "properties": {
            "minimumInterval": {
                "description": "Specifies the minimum interval required between calls to Play, in milliseconds. Once the sound starts playing, all further Play calls will be ignored until the interval has elapsed.",
                "type": "number",
                "tests": [
                    100
                ]
            },
            "source": {
                "description": "The name of the sound file. Only certain formats are supported. See http://developer.android.com/guide/appendix/media-formats.html",
                "type": "string",
                "tests": [
                    `"/storage/emulated/0/Android/data/edu.mit.appinventor.aicompanion3/files/My Documents/Recordings/app_inventor_1675592812960.3gp"`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "pause": {
                "parameters": {},
                "description": "Pauses playing the sound if it is being played.",
                "tests": []
            },
            "play": {
                "parameters": {},
                "description": "Plays the sound.",
                "tests": []
            },
            "resume": {
                "parameters": {},
                "description": "Resumes playing the sound after a pause.",
                "tests": []
            },
            "stop": {
                "parameters": {},
                "description": "Stops playing the sound if it is being played.",
                "tests": []
            },
            "vibrate": {
                "parameters": {
                    "millisecs": "number"
                },
                "description": "Vibrates for the specified number of milliseconds.",
                "tests": [
                    0
                ]
            }
        },
        "events": {},
        "runTimeName": "Sound"
    },
    "soundrecorder": {  
        "properties": {
            "savedRecording": {
                "description": "Specifies the path to the file where the recording should be stored. If this property is the empty string, then starting a recording will create a file in an appropriate location. If the property is not the empty string, it should specify a complete path to a file in an existing directory, including a file name with the extension .3gp.",
                "type": "string",
                "tests": [
                    `""`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "start": {
                "parameters": {},
                "description": "Starts recording.",
                "tests": []
            },
            "stop": {
                "parameters": {},
                "description": "Stops recording.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "afterSoundRecorded": {
                "parameters": {
                    "sound": "string"
                },
                "description": "Provides the location of the newly created sound."
            },
            "startedRecording": {
                "parameters": {},
                "description": "Indicates that the recorder has started, and can be stopped."
            },
            "stoppedRecording": {
                "parameters": {},
                "description": "Indicates that the recorder has stopped, and can be started again."
            }
        },
        "runTimeName": "SoundRecorder"
    },
    "speechrecognizer": {
        "properties": {
            "language": {
                "description": "Suggests the language to use for recognizing speech. An empty string (the default) will use the system's default language. Language is specified using a language tag (https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) with an optional region suffix, such as en or es-MX. The set of supported languages will vary by device. ",
                "type": "string",
                "tests": [
                    `""`
                ]
            },
            "result": {
                "description": "Returns the last text produced by the recognizer.",
                "type": "string",
                "tests": [
                    `"Test result"`
                ]
            },
            "useLegacy": {
                "description": "If true, a separate dialog is used to recognize speech (the default). If false, speech is recognized in the background and updates are received as it recognizes words. AfterGettingText may get several calls with partial set to true. Once sufficient time has elapsed since the last utterance, or StopListening is called, the last string will be returned with partial set to false to indicate that it is the final recognized string and no more data will be provided until recognition is again started. See AfterGettingText for more details on partial speech recognition. ",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "language",
            "result"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "result",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "getText": {
                "parameters": {},
                "description": "Asks the user to speak, and converts the speech to text. Signals the AfterGettingText event when the result is available.",
                "tests": []
            },
            "stop": {
                "parameters": {},
                "description": "Function used to forcefully stop listening speech in cases where SpeechRecognizer cannot stop automatically. This function works only when the UseLegacy property is set to false.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "afterGettingText": {
                "parameters": {
                    "result": "string",
                    "partial": "boolean"
                },
                "description": "Simple event to raise after the SpeechRecognizer has recognized speech. If UseLegacy is true, then this event will only happen once at the very end of the recognition. If UseLegacy is false, then this event will run multiple times as the SpeechRecognizer incrementally recognizes speech. In this case, partial will be true until the recognized speech has been finalized (e.g., the user has stopped speaking), in which case partial will be false."
            },
            "beforeGettingText": {
                "parameters": {},
                "description": "Simple event to raise when the SpeechRecognizer is invoked but before its activity is started."
            }
        },
        "runTimeName": "SpeechRecognizer"
    },
    "texttospeech": {  
        "properties": {
            "availableCountries": {
                "description": "List of the country codes available on this device for use with TextToSpeech. Check the Android developer documentation under supported languages to find the meanings of these abbreviations.",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "availableLanguages": {
                "description": "List of the languages available on this device for use with TextToSpeech. Check the Android developer documentation under supported languages to find the meanings of these abbreviations.",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "country": {
                "description": "Country code to use for speech generation. This can affect the pronunciation. For example, British English (GBR) will sound different from US English (USA). Not every country code will affect every language. This is normallt a 3 character uppercase string.",
                "type": "string",
                "tests": [
                    `"AUS"`
                ]
            },
            "language": {
                "description": "Sets the language for TextToSpeech. This changes the way that words are pronounced, not the actual language that is spoken. For example, setting the language to French and speaking English text will sound like someone speaking English with a French accent. This normally a 2 character lowercase string.",
                "type": "string",
                "tests": [
                    `"en"`
                ]
            },
            "pitch": {
                "description": "Sets the speech pitch for the TextToSpeech. The values should be between 0 and 2 where lower values lower the tone of synthesized voice and greater values raise it. The default value is 1.0 for normal pitch.",
                "type": "number",
                "tests": [
                    1.05
                ]
            },
            "result": {
                "description": "Returns true{",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "speechRate": {
                "description": "Sets the SpeechRate for TextToSpeech. The values should be between 0 and 2 where lower values slow down the pitch and greater values accelerate it. The default value is 1.0 for normal speech rate.",
                "type": "number",
                "tests": [
                    1.0
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "availableCountries",
            "availableLanguages",
            "result"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "availableCountries",
            "availableLanguages",
            "result",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "speak": {
                "parameters": {
                    "message": "string"
                },
                "description": "Speaks the given message.",
                "tests": [
                    `"Test message"`
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "afterSpeaking": {
                "parameters": {
                    "result": "boolean"
                },
                "description": "Event to raise after the message is spoken. The result will be true if the message is spoken successfully, otherwise it will be false."
            },
            "beforeSpeaking": {
                "parameters": {},
                "description": "Event to raise when Speak is invoked, before the message is spoken."
            }
        },
        "runTimeName": "TextToSpeech"
    },
    "translator": {
        "properties": {
            "apiKey": {
                "description": "The API Key to use. MIT App Inventor will automatically fill this value in. You should not need to change it.",
                "type": "string",
                "tests": [
                    `""`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "apiKey",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "requestTranslation": {
                "parameters": {
                    "languageToTranslateTo": "string",
                    "textToTranslate": "string"
                },
                "description": "By providing a target language to translate to (for instance, 'es' for Spanish, 'en' for English, or 'ru' for Russian), and a word or sentence to translate, this method will request a translation. Once the text is translated by the external service, the event GotTranslation will be executed. Note: Translator will attempt to detect the source language. You can also specify prepending it to the language translation, e.g., es-ru will specify Spanish to Russian translation.",
                "tests": [
                    `"en-es"`,
                    `"Hello world!"`
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "gotTranslation": {
                "parameters": {
                    "responseCode": "string",
                    "translation": "string"
                },
                "description": "Event indicating that a request has finished and has returned data (translation)."
            }
        },
        "runTimeName": "Translator"
    },
    "videoplayer": {
        "properties": {
            "fullScreen": {
                "description": "Sets whether the video should be shown in fullscreen or not.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "height": {
                "description": "Specifies the component's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    120
                ]
            },
            "heightPercent": {
                "description": "Specifies the VideoPlayer's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    25
                ]
            },
            "source": {
                "description": "Sets the \"path\" to the video. Usually, this will be the name of the video file, which should be added in the Designer.",
                "type": "string",
                "tests": [
                    `"Test source"`
                ]
            },
            "visible": {
                "description": "Specifies whether the VideoPlayer should be visible on the screen. Value is true if the VideoPlayer is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "volume": {
                "description": "Sets the volume property to a number between 0 and 100. Values less than 0 will be treated as 0, and values greater than 100 will be treated as 100.",
                "type": "number",
                "tests": [
                    50
                ]
            },
            "width": {
                "description": "Specifies the component's horizontal width, measured in pixels.",
                "type": "number",
                "tests": [
                    300
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the VideoPlayer as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    80
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "fullScreen",
            "height",
            "heightPercent",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "source",
            "volume",
            "heightPercent",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "getDuration": {
                "parameters": {},
                "description": "Returns duration of the video in milliseconds.",
                "tests": []
            },
            "pause": {
                "parameters": {},
                "description": "Pauses playback of the video. Playback can be resumed at the same location by calling the Start method.",
                "tests": []
            },
            "seekTo": {
                "parameters": {
                    "ms": "number"
                },
                "description": "Seeks to the requested time (specified in milliseconds) in the video. If the video is paused, the frame shown will not be updated by the seek. The player can jump only to key frames in the video, so seeking to times that differ by short intervals may not actually move to different frames.",
                "tests": [
                    0
                ]
            },
            "start": {
                "parameters": {},
                "description": "Plays the media specified by the Source.",
                "tests": []
            },
            "stop": {
                "parameters": {},
                "description": "Resets to start of video and pauses it if video was playing.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "completed": {
                "parameters": {},
                "description": "Indicates that the video has reached the end."
            }
        },
        "runTimeName": "VideoPlayer"
    },
    "button": {
        "properties": {
            "backgroundColor": {
                "description": "Specifies the Button's background color as an RRGGBBAA red-gren-blue-alpha integer. If an Image has been set, the color change will not be visible until the Image is removed.",
                "type": "color",
                "tests": [
                    "\"FFd3893f\""
                ]
            },
            "enabled": {
                "description": "Specifies whether the Button should be active and clickable.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontBold": {
                "description": "Specifies whether the text of the Button should be bold. Some fonts do not support bold.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontItalic": {
                "description": "Specifies whether the text of the Button should be italic. Some fonts do not support italic.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontSize": {
                "description": "Specifies the text font size of the Button, measured in sp(scale-independent pixels).",
                "type": "number",
                "tests": [
                    12
                ]
            },
            "fontTypeface": {
                "description": "Specifies the text font face of the Button as 'serif', 'sans serif', or 'monospace'.",
                "type": "string",
                "tests": [
                    `"monospace"`
                ]
            },
            "height": {
                "description": "Specifies the Button's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    48
                ]
            },
            "heightPercent": {
                "description": "Specifies the Button's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    12
                ]
            },
            "image": {
                "description": "Specifies the path of the Button's image. If there is both an Image and a BackgroundColor specified, only the Image will be visible.",
                "type": "string",
                "tests": [
                    `"cat.png"`
                ]
            },
            "shape": {
                "description": "Specifies a the shape of the Button. The valid values for this property are 'round', 'rectangle', and 'oval'. The Shape will not be visible if an Image is used.",
                "type": "string",
                "tests": [
                    '"oval"'
                ]
            },
            "showFeedback": {
                "description": "Specifies if a visual feedback should be shown when a Button with an assigned Image is pressed.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "text": {
                "description": "Specifies the text displayed by the Button.",
                "type": "string",
                "tests": [
                    `"Test text"`
                ]
            },
            "textAlignment": {
                "description": "Specifies the alignment of the Button's text. Valid values are 'left', 'center' and 'right'",
                "type": "string",
                "tests": [
                    `"left"`
                ]
            },
            "textColor": {
                "description": "Specifies the text color of the Button as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string.",
                "type": "color",
                "tests": [
                    "\"FF8ce1e0\""
                ]
            },
            "visible": {
                "description": "Specifies whether the Button should be visible on the screen. Value is true if the Button is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the Button, measured in pixels.",
                "type": "number",
                "tests": [
                    180
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the Button as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    50
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            //    "height",
            "heightPercent",
            //    "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "fontTypeface",
            "heightPercent",
            "shape",
            "textAlignment",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "fontTypeface",
            "shape",
            "textAlignment",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "click": {
                "parameters": {},
                "description": "Indicates that the user tapped and released the Button."
            },
            "gotFocus": {
                "parameters": {},
                "description": "Indicates the cursor moved over the Button so it is now possible to click it."
            },
            "longClick": {
                "parameters": {},
                "description": "Indicates that the user held the Button down."
            },
            "lostFocus": {
                "parameters": {},
                "description": "Indicates the cursor moved away from the Button so it is now no longer possible to click it."
            },
            "touchDown": {
                "parameters": {},
                "description": "Indicates that the Button was pressed down."
            },
            "touchUp": {
                "parameters": {},
                "description": "Indicates that the Button has been released."
            }
        },
        "runTimeName": "Button"
    },
    "checkbox": {
        "properties": {
            "backgroundColor": {
                "description": "Specifies the background color of the CheckBox as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string.",
                "type": "color",
                "tests": [
                    "\"FFd9239f\""
                ]
            },
            "checked": {
                "description": "Set to true if the box is checked, false otherwise.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "enabled": {
                "description": "Specifies whether the CheckBox should be active and clickable.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontBold": {
                "description": "Specifies whether the text of the CheckBox should be bold. Some fonts do not support bold.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontItalic": {
                "description": "Specifies whether the text of the CheckBox should be italic. Some fonts do not support italic.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontSize": {
                "description": "Specifies the text font size of the CheckBox, measured in sp(scale-independent pixels).",
                "type": "number",
                "tests": [
                    24
                ]
            },
            "fontTypeface": {
                "description": "Specifies the text font face of the CheckBox as 'serif', 'sans serif', or 'monospace'.",
                "type": "number",
                "tests": [
                    `"monospace"`
                ]
            },
            "height": {
                "description": "Specifies the CheckBox's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    48
                ]
            },
            "heightPercent": {
                "description": "Specifies the CheckBox's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    `"25%"`
                ]
            },
            "text": {
                "description": "Specifies the text displayed by the CheckBox.",
                "type": "string",
                "tests": [
                    `"Test text"`
                ]
            },
            "textColor": {
                "description": "Specifies the text color of the CheckBox as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string.",
                "type": "color",
                "tests": [
                    "\"FF6ce0f7\""
                ]
            },
            "visible": {
                "description": "Specifies whether the CheckBox should be visible on the screen. Value is true if the CheckBox is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the CheckBox, measured in pixels.",
                "type": "number",
                "tests": [
                    155
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the CheckBox as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    `"36%"`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "height",
            "heightPercent",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "fontBold",
            "fontItalic",
            "fontTypeface",
            "heightPercent",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "fontBold",
            "fontItalic",
            "fontTypeface",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "changed": {
                "parameters": {},
                "description": "User tapped and released the CheckBox."
            },
            "gotFocus": {
                "parameters": {},
                "description": "CheckBox became the focused component."
            },
            "lostFocus": {
                "parameters": {},
                "description": "CheckBox stopped being the focused component."
            }
        },
        "runTimeName": "CheckBox"
    },
    "datepicker": {
        "properties": {
            "backgroundColor": {
                "description": "Specifies the DatePicker's background color as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string. If an Image has been set, the color change will not be visible until the Image is removed.",
                "type": "color",
                "tests": [
                    "\"FFecf316\""
                ]
            },
            "day": {
                "description": "Returns the Day of the month that was last picked using the DatePicker.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "enabled": {
                "description": "Specifies whether the DatePicker should be active and clickable.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontBold": {
                "description": "Specifies whether the text of the DatePicker should be bold. Some fonts do not support bold.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontItalic": {
                "description": "Specifies whether the text of the DatePicker should be italic. Some fonts do not support italic.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontSize": {
                "description": "Specifies the text font size of the DatePicker, measured in sp(scale-independent pixels).",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "fontTypeface": {
                "description": "Specifies the text font face of the DatePicker as 'serif', 'sans serif', or 'monospace'.",
                "type": "string",
                "tests": [
                    `"monospace"`
                ]
            },
            "height": {
                "description": "Specifies the DatePicker's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    48
                ]
            },
            "heightPercent": {
                "description": "Specifies the DatePicker's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    `"25%"`
                ]
            },
            "image": {
                "description": "Specifies the path of the DatePicker's image. If there is both an Image and a BackgroundColor specified, only the Image will be visible.",
                "type": "string",
                "tests": [
                    `"cat.png"`
                ]
            },
            "instant": {
                "description": "Returns instant of the date that was last picked using the DatePicker.",
                "type": "InstantInTime",
                "tests": [
                    1234567890
                ]
            },
            "month": {
                "description": "Returns the number of the Month that was last picked using the DatePicker.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "monthInText": {
                "description": "Returns the name of the Month that was last picked using the DatePicker.",
                "type": "string",
                "tests": [
                    "Test monthInText"
                ]
            },
            "shape": {
                "description": "Specifies the shape of the DatePicker. The valid values for this property are'round', 'rectangle' and 'oval'. The Shape will not be visible if an Image is used.",
                "type": "number",
                "tests": [
                    `"oval"`
                ]
            },
            "showFeedback": {
                "description": "Specifies if a visual feedback should be shown when a DatePicker with an assigned Image is pressed.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "text": {
                "description": "Specifies the text displayed by the DatePicker.",
                "type": "string",
                "tests": [
                    `"Test text"`
                ]
            },
            "textAlignment": {
                "description": "Specifies the alignment of the DatePicker's text. Valid values are 'left', 'right' and 'center'.",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "textColor": {
                "description": "Specifies the text color of the DatePicker as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string.",
                "type": "color",
                "tests": [
                    "\"FFed32be\""
                ]
            },
            "visible": {
                "description": "Specifies whether the DatePicker should be visible on the screen. Value is true if the DatePicker is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the DatePicker, measured in pixels.",
                "type": "number",
                "tests": [
                    220
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the DatePicker as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    `"22%"`
                ]
            },
            "year": {
                "description": "Returns the Year that was last picked using the DatePicker.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "day",
            "height",
            "heightPercent",
            "instant",
            "month",
            "monthInText",
            "width",
            "widthPercent",
            "year"
        ],
        "codeNoRead": [
            "fontTypeface",
            "heightPercent",
            "shape",
            "textAlignment",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "day",
            "fontTypeface",
            "instant",
            "month",
            "monthInText",
            "shape",
            "textAlignment",
            "year",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "launchPicker": {
                "parameters": {},
                "description": "Launches the DatePicker dialog. The AfterDateSet event will be run after the user confirms their selection.",
                "tests": []
            },
            "setDateToDisplay": {
                "parameters": {
                    "year": "number",
                    "month": "number",
                    "day": "number"
                },
                "description": "Allows the user to set the date to be displayed when the date picker opens. Valid values for the month field are 1-12 and 1-31 for the day field.",
                "tests": [
                    0,
                    0,
                    0
                ]
            },
            "setDateToDisplayFromInstant": {
                "parameters": {
                    "instant": "InstantInTime"
                },
                "description": "Allows the user to set the date from the instant to be displayed when the date picker opens.",
                "tests": [
                    6548943121
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "afterDateSet": {
                "parameters": {},
                "description": "Event that runs after the user chooses a Date in the dialog."
            },
            "gotFocus": {
                "parameters": {},
                "description": "Indicates the cursor moved over the DatePicker so it is now possible to click it."
            },
            "lostFocus": {
                "parameters": {},
                "description": "Indicates the cursor moved away from the DatePicker so it is now no longer possible to click it."
            },
            "touchDown": {
                "parameters": {},
                "description": "Indicates that the DatePicker was pressed down."
            },
            "touchUp": {
                "parameters": {},
                "description": "Indicates that the DatePicker has been released."
            }
        },
        "runTimeName": "DatePicker"
    },
    "image": {
        "properties": {
            "alternateText": {
                "description": "A written description of what the image looks like.",
                "type": "string",
                "tests": [
                    `"Test alternateText"`
                ]
            },
            "animation": {
                "description": "This is a limited form of animation that can attach a small number of motion types to images. The allowable motions are ScrollRightSlow, ScrollRight, ScrollRightFast, ScrollLeftSlow, ScrollLeft, ScrollLeftFast, and Stop.",
                "type": "string",
                "tests": [
                    `"ScrollRightSlow"`
                ]
            },
            "clickable": {
                "description": "Specifies whether the image should be clickable or not.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "height": {
                "description": "Specifies the Image's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    60
                ]
            },
            "heightPercent": {
                "description": "Specifies the Image's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    `"20%"`
                ]
            },
            "picture": {
                "description": "Specifies the path of the Image's Picture.",
                "type": "string",
                "tests": [
                    `"cat.png"`
                ]
            },
            "rotationAngle": {
                "description": "The angle at which the image picture appears rotated. This rotation does not appear on the designer screen, only on the device.",
                "type": "number",
                "tests": [
                    45
                ]
            },
            "scalePictureToFit": {
                "description": "Specifies whether the image should be resized to match the size of the ImageView.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "scaling": {
                "description": "This property determines how the picture scales according to the Height or Width of the Image. Scale proportionally (0) preserves the picture aspect ratio. Scale to fit (1) matches the Image area, even if the aspect ratio changes.",
                "type": "number",
                "tests": [
                    1
                ]
            },
            "visible": {
                "description": "Specifies whether the Image should be visible on the screen. Value is true if the Image is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the Image, measured in pixels.",
                "type": "number",
                "tests": [
                    72
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the Image as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    `"18%"`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "animation",
            "heightPercent",
            "scaling",
            "widthPercent"
        ],
        "codeNoRead": [
            "alternateText",        //doesn't agree with App Inventor Core
            "animation",
            "heightPercent",
            "scalePictureToFit",    //doesn't agree with App Inventor Core
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "click": {
                "parameters": {},
                "description": "An event that occurs when an image is clicked."
            }
        },
        "runTimeName": "Image"
    },
    "label": {
        "properties": {
            "backgroundColor": {
                "description": "Specifies the label's background color as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string.",
                "type": "color",
                "tests": [
                    "\"FF228507\""
                ]
            },
            "fontBold": {
                "description": "Specifies whether the label's text should be bold. Some fonts do not support bold.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontItalic": {
                "description": "Specifies whether the label's text should be italic. Some fonts do not support italic.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontSize": {
                "description": "Specifies the label's text's font size, measured in sp(scale-independent pixels).",
                "type": "number",
                "tests": [
                    24
                ]
            },
            "fontTypeface": {
                "description": "Specifies the label's text's font face as 'serif', 'sans serif', or 'monospace'.",
                "type": "number",
                "tests": [
                    `"monospace"`
                ]
            },
            "HTMLContent": {
                "description": "Returns the content of the Label as HTML. This is only useful if the HTMLFormat property is true.",
                "type": "string",
                "tests": [
                    "Test HTMLContent"
                ]
            },
            "HTMLFormat": {
                "description": "Specifies the label's text's format",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "hasMargins": {
                "description": "Specifies whether the label should have margins. This margin value is not well coordinated with the designer, where the margins are defined for the arrangement, not just for individual labels.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "height": {
                "description": "Specifies the Label's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "heightPercent": {
                "description": "Specifies the Label's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "text": {
                "description": "Specifies the text displayed by the label.",
                "type": "string",
                "tests": [
                    `"Test text"`
                ]
            },
            "textAlignment": {
                "description": "Specifies the alignment of the label's text, options are 'left', 'right' and 'center'",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "textColor": {
                "description": "Specifies the label's text color as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string.",
                "type": "color",
                "tests": [
                    "\"FFee6267\""
                ]
            },
            "visible": {
                "description": "Specifies whether the Label should be visible on the screen. Value is true if the Label is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the Label, measured in pixels.",
                "type": "number",
                "tests": [
                    90
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the Label as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    `"66%"`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "HTMLContent",
            "heightPercent",
            "widthPercent"
        ],
        "codeNoRead": [
            "fontBold",
            "fontItalic",
            "fontTypeface",
            "HTMLFormat",
            "heightPercent",
            "textAlignment",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "fontBold",
            "fontItalic",
            "fontTypeface",
            "HTMLContent",
            "HTMLFormat",
            "textAlignment",
            "class",
            "id",
            "name"
        ],
        "methods": {},
        "events": {},
        "runTimeName": "Label"
    },
    "listpicker": {
        "properties": {
            "backgroundColor": {
                "description": "Specifies the ListPicker's background color as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string. If an Image has been set, the color change will not be visible until the Image is removed.",
                "type": "color",
                "tests": [
                    "\"FF223aab\""
                ]
            },
            "elements": {
                "description": "Specifies the list of choices to display. This is in the form of an array of strings e.g. ['e4', 'e5', 'e6'] ",
                "type": "array",
                "tests": [
                    ["e4", "e5", "e6"]
                ]
            },
            "elementsFromString": {
                "description": "Set the list of choices from a string of comma-separated values.",
                "type": "string",
                "tests": [
                    `"el1,el2,el3"`
                ]
            },
            "enabled": {
                "description": "Specifies whether the ListPicker should be active and clickable.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontBold": {
                "description": "Specifies whether the text of the ListPicker should be bold. Some fonts do not support bold.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontItalic": {
                "description": "Specifies whether the text of the ListPicker should be italic. Some fonts do not support italic.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontSize": {
                "description": "Specifies the text font size of the ListPicker, measured in sp(scale-independent pixels).",
                "type": "number",
                "tests": [
                    24
                ]
            },
            "fontTypeface": {
                "description": "Specifies the text font face of the ListPicker as 'serif', 'sans serif', or 'monospace'.",
                "type": "string",
                "tests": [
                    `"monospace"`
                ]
            },
            "height": {
                "description": "Specifies the ListPicker's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    200
                ]
            },
            "heightPercent": {
                "description": "Specifies the ListPicker's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    `"50%"`
                ]
            },
            "image": {
                "description": "Specifies the path of the ListPicker's image. If there is both an Image and a BackgroundColor specified, only the Image will be visible.",
                "type": "string",
                "tests": [
                    `"cat.png"`
                ]
            },
            "itemBackgroundColor": {
                "description": "The background color of the ListPicker items.",
                "type": "color",
                "tests": [
                    "\"FF22f54f\""
                ]
            },
            "itemTextColor": {
                "description": "The text color of the ListPicker items.",
                "type": "color",
                "tests": [
                    "\"FF745c33\""
                ]
            },
            "selection": {
                "description": "The selected item. When directly changed by the programmer, the SelectionIndex property is also changed to the first item in the ListPicker with the given value. If the value is not in Elements, SelectionIndex will be set to 0.",
                "type": "string",
                "tests": [
                    `"el1"`
                ]
            },
            "selectionIndex": {
                "description": "Selection index property setter method.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "shape": {
                "description": "Specifies the shape of the ListPicker. The valid values for this property are 'round', 'rectangle' and 'oval'. The Shape will not be visible if an Image is used.",
                "type": "number",
                "tests": [
                    `"round"`
                ]
            },
            "showFeedback": {
                "description": "Specifies if a visual feedback should be shown when a ListPicker with an assigned Image is pressed.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "showFilterBar": {
                "description": "If true, the ListPicker will show a search filter bar.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "text": {
                "description": "Specifies the text displayed by the ListPicker.",
                "type": "string",
                "tests": [
                    `"Test text"`
                ]
            },
            "textAlignment": {
                "description": "Specifies the alignment of the ListPicker's text. Valid values are 'left', 'right' and 'center'",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "textColor": {
                "description": "Specifies the text color of the ListPicker as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string.",
                "type": "color",
                "tests": [
                    "\"FF778c08\""
                ]
            },
            "title": {
                "description": "Optional title displayed at the top of the list of choices.",
                "type": "string",
                "tests": [
                    `"Test title"`
                ]
            },
            "visible": {
                "description": "Specifies whether the ListPicker should be visible on the screen. Value is true if the ListPicker is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the ListPicker, measured in pixels.",
                "type": "number",
                "tests": [
                    280
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the ListPicker as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    `"95%"`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "elements",
            "height",
            "heightPercent",
            "selectionIndex",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "elementsFromString",
            "fontTypeface",
            "heightPercent",
            "shape",
            "textAlignment",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "fontTypeface",
            "shape",
            "textAlignment",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "open": {
                "parameters": {},
                "description": "Opens the ListPicker, as though the user clicked on it.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "afterPicking": {
                "parameters": {},
                "description": "Event to be raised after the ListPicker activity returns its result and the properties have been filled in."
            },
            "beforePicking": {
                "parameters": {},
                "description": "Event to raise when the ListPicker is clicked or the picker is shown using the Open method. This event occurs before the picker is displayed, and can be used to prepare the picker before it is shown."
            },
            "gotFocus": {
                "parameters": {},
                "description": "Indicates the cursor moved over the ListPicker so it is now possible to click it."
            },
            "lostFocus": {
                "parameters": {},
                "description": "Indicates the cursor moved away from the ListPicker so it is now no longer possible to click it."
            },
            "touchDown": {
                "parameters": {},
                "description": "Indicates that the ListPicker was pressed down."
            },
            "touchUp": {
                "parameters": {},
                "description": "Indicates that the ListPicker has been released."
            }
        },
        "runTimeName": "ListPicker"
    },
    "listview": {
        "properties": {
            "backgroundColor": {
                "description": "The color of the ListView background.",
                "type": "color",
                "tests": [
                    "\"FF47c39e\""
                ]
            },
            "elements": {
                "description": "Specifies the list of choices to display. This is the form ['choice1', 'choice2', 'choice3'].",
                "type": "array",
                "tests": [
                    ["choice1", "choice2", "choice3"]
                ]
            },
            "elementsFromString": {
                "description": "Set the list of choices specified as a string with the elements separated by commas such as",
                "type": "string",
                "tests": [
                    `"string1, string2, string3"`
                ]
            },
            "fontSizeDetail": {
                "description": "Specifies the ListView item's text font size",
                "type": "number",
                "tests": [
                    24
                ]
            },
            "fontTypeface": {
                "description": "Specifies the label's text's font face as 'serif', 'sans serif', or 'monospace'.",
                "type": "string",
                "tests": [
                    `"monospace"`
                ]
            },
            "fontTypefaceDetail": {
                "description": "Specifies the label's text's font face as 'serif', 'sans serif', or 'monospace'.",
                "type": "number",
                "tests": [
                    `"serif"`
                ]
            },
            "height": {
                "description": "Specifies the ListView's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    200
                ]
            },
            "heightPercent": {
                "description": "Specifies the ListView's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    `"83%"`
                ]
            },
            "imageHeight": {
                "description": "Specifies the image height of ListView layouts containing images",
                "type": "number",
                "tests": [
                    60
                ]
            },
            "imageWidth": {
                "description": "Specifies the image width of ListView layouts containing images",
                "type": "number",
                "tests": [
                    60
                ]
            },
            "listData": {
                "description": "Specifies the name of a file that can be used to input list data. File should be a CSV file with three entries per line. TitleText, DetailText, Image Name. Words should not be surrounded in double quotes and should not contain commas.",
                "type": "string",
                "tests": [
                    `"testfile.csv"`
                ]
            },
            "listViewLayout": {
                "description": "Specifies type of layout for ListView row. Options are: 'text', 'text_detail', 'text_detail_horz', 'image_text', 'image_text_detail'",
                "type": "string",
                "tests": [
                    `"image_text_detail"`
                ]
            },
            "orientation": {
                "description": "Specifies the layout's orientation. This may be 'horizontal' or 'vertical'",
                "type": "string",
                "tests": [
                    `"vertical"`
                ]
            },
            "selection": {
                "description": "Returns the text in the ListView at the position of SelectionIndex.",
                "type": "string",
                "tests": [
                    `"Test selection"`
                ]
            },
            "selectionColor": {
                "description": "The color of the item when it is selected.",
                "type": "color",
                "tests": [
                    "\"FF18d141\""
                ]
            },
            "selectionDetailText": {
                "description": "Returns the Secondary or Detail text in the ListView at the position set by SelectionIndex",
                "type": "string",
                "tests": [
                    "Test selectionDetailText"
                ]
            },
            "selectionIndex": {
                "description": "The index of the currently selected item, starting at 0. If no item is selected, the value will be -1. If an attempt is made to set this to a number less than 0 or greater than the number of items in the ListView, SelectionIndex will be set to 1, and Selection will be set to the empty text.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "showFilterBar": {
                "description": "Sets visibility of the filter bar. true will show the bar, false will hide it.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "textColor": {
                "description": "The text color of the ListView items.",
                "type": "color",
                "tests": [
                    "\"FF9065bc\""
                ]
            },
            "textColorDetail": {
                "description": "Specifies the color of the secondary text in a ListView layout",
                "type": "color",
                "tests": [
                    "\"FF7e01e1\""
                ]
            },
            "textSize": {
                "description": "Specifies the ListView item's text font size",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "visible": {
                "description": "Specifies whether the ListView should be visible on the screen. Value is true if the ListView is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the ListView, measured in pixels.",
                "type": "number",
                "tests": [
                    360
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the ListView as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    `"85%"`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "elements",
            "height",
            "heightPercent",
            "selectionDetailText",
            "selectionIndex",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "elementsFromString",
            "fontTypeface",
            "fontTypefaceDetail",
            "heightPercent",
            "listData",
            "listViewLayout",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "fontTypeface",
            "fontTypefaceDetail",
            "listData",
            "listViewLayout",
            "selectionDetailText",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "createElement": {
                "parameters": {
                    "mainText": "string",
                    "detailText": "string",
                    "imageName": "string"
                },
                "description": "Creates a new element that can appended to an array of similar items. This new array can be assigned as the listview's Elements to update the listview items that are seen on the screen.",
                "tests": [
                    "Test mainText",
                    "Test detailText",
                    "Test imageName"
                ]
            },
            "getDetailText": {
                "parameters": {
                    "index": "number"
                },
                "description": "Get the Detail Text of a ListView element at the given index.",
                "tests": [
                    0
                ]
            },
            "getImageName": {
                "parameters": {
                    "index": "number"
                },
                "description": "Get the filename of the image of a ListView element that has been uploaded to Media at the given index.",
                "tests": [
                    0
                ]
            },
            "getMainText": {
                "parameters": {
                    "index": "number"
                },
                "description": "Get the Main Text of a ListView element at the given index.",
                "tests": [
                    0
                ]
            },
            "refresh": {
                "parameters": {},
                "description": "Reload the ListView to reflect any changes in the data.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "afterPicking": {
                "parameters": {},
                "description": "Simple event to be raised after the an element has been chosen in the list. The selected element is available in the Selection property."
            }
        },
        "runTimeName": "ListView"
    },
    "notifier": {
        "properties": {
            "backgroundColor": {
                "description": "Specifies the background color for alerts (not dialogs).",
                "type": "color",
                "tests": [
                    "\"FF4a0171\""
                ]
            },
            "notifierLength": {
                "description": "Specifies the length of time that the alert is shown -- either \"short\" or \"long\".",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "textColor": {
                "description": "Specifies the text color for alerts (not dialogs).",
                "type": "color",
                "tests": [
                    "\"FF77d840\""
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "backgroundColor",
            "notifierLength",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "notifierLength",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "dismissProgressDialog": {
                "parameters": {},
                "description": "Dismisses the alert created by the ShowProgressDialog block",
                "tests": []
            },
            "logError": {
                "parameters": {
                    "message": "string"
                },
                "description": "Writes an error message to the Android system log. See the Google Android documentation for how to access the log.",
                "tests": [
                    `"Test message"`
                ]
            },
            "logInfo": {
                "parameters": {
                    "message": "string"
                },
                "description": "Writes an information message to the Android log.",
                "tests": [
                    `"Test message"`
                ]
            },
            "logWarning": {
                "parameters": {
                    "message": "string"
                },
                "description": "Writes a warning message to the Android log. See the Google Android documentation for how to access the log.",
                "tests": [
                    `"Test message"`
                ]
            },
            "showAlert": {
                "parameters": {
                    "notice": "string"
                },
                "description": "Display a temporary notification.",
                "tests": [
                    `"Test notice"`
                ]
            },
            "showChooseDialog": {
                "parameters": {
                    "message": "string",
                    "title": "string",
                    "button1Text": "string",
                    "button2Text": "string",
                    "cancelable": "boolean"
                },
                "description": "Shows a dialog box with two buttons, from which the user can choose. If cancelable is true there will be an additional CANCEL button. Pressing a button will raise the AfterChoosing event. The \"choice\" parameter to AfterChoosing will be the text on the button that was pressed, or \"Cancel\" if the CANCEL button was pressed. If canceled, the TextInputCanceled event will also run.",
                "tests": [
                    `"Test message"`,
                    `"Test title"`,
                    `"Test button1Text"`,
                    `"Test button2Text"`,
                    true
                ]
            },
            "showMessageDialog": {
                "parameters": {
                    "message": "string",
                    "title": "string",
                    "buttonText": "string"
                },
                "description": "Display an alert dialog with a single button that dismisses the alert.",
                "tests": [
                    `"Test message"`,
                    `"Test title"`,
                    `"Test buttonText"`
                ]
            },
            "showPasswordDialog": {
                "parameters": {
                    "message": "string",
                    "title": "string",
                    "cancelable": "boolean"
                },
                "description": "Shows a dialog box where the user can enter password (input is masked), after which the AfterTextInput event will be raised. If cancelable is true there will be an additional CANCEL button. The AfterTextInput and TextInputCanceled events behave the same way as described in ShowTextDialog.",
                "tests": [
                    `"Test message"`,
                    `"Test title"`,
                    true
                ]
            },
            "showProgressDialog": {
                "parameters": {
                    "message": "string",
                    "title": "string"
                },
                "description": "Shows a dialog box with an optional title and message (use empty strings if they are not wanted). This dialog box contains a spinning artifact to indicate that the program is working. It cannot be canceled by the user but must be dismissed by the App Inventor Program by using the DismissProgressDialog method.",
                "tests": [
                    `"Test message"`,
                    `"Test title"`
                ]
            },
            "showTextDialog": {
                "parameters": {
                    "message": "string",
                    "title": "string",
                    "cancelable": "boolean"
                },
                "description": "Shows a dialog box where the user can enter text, after which the AfterTextInput event will be raised. If cancelable is true there will be an additional CANCEL button. Entering text will raise the AfterTextInput event. The \"response\" parameter to AfterTextInput will be the text that was entered, or \"Cancel\" if the CANCEL button was pressed. If canceled, the TextInputCanceled event will also run.",
                "tests": [
                    `"Test message"`,
                    `"Test title"`,
                    true
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    `"Test eventName"`,
                    `"callback"`
                ]
            }
        },
        "events": {
            "afterChoosing": {
                "parameters": {
                    "choice": "string"
                },
                "description": "Event after the user has made a selection for ShowChooseDialog."
            },
            "afterTextInput": {
                "parameters": {
                    "response": "string"
                },
                "description": "Event raised after the user has responded to ShowTextDialog."
            },
            "choosingCanceled": {
                "parameters": {},
                "description": "Event raised when the user cancels choosing an option. ShowChooseDialog."
            },
            "textInputCanceled": {
                "parameters": {},
                "description": "Event raised when the user cancels ShowPasswordDialog, or ShowTextDialog."
            }
        },
        "runTimeName": "Notifier"
    },
    "passwordtextbox": {
        "properties": {
            "backgroundColor": {
                "description": "The background color of the `PasswordTextBox``. You can choose a color by name in the Designer or in the Blocks Editor. The default background color is 'default' (shaded 3-D look).",
                "type": "color",
                "tests": [
                    "\"FF901219\""
                ]
            },
            "enabled": {
                "description": "If set, user can enter text into the PasswordTextBox.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontBold": {
                "description": "Specifies whether the text of the PasswordTextBox should be bold. Some fonts do not support bold.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontItalic": {
                "description": "Specifies whether the text of the PasswordTextBox should be italic. Some fonts do not support italic.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontSize": {
                "description": "Specifies the text font size of the PasswordTextBox, measured in sp(scale-independent pixels).",
                "type": "number",
                "tests": [
                    24
                ]
            },
            "fontTypeface": {
                "description": "The text font face of the PasswordTextBox. Valid values are 0 (default), 1 (serif), 2 (sans serif), or 3 (monospace).",
                "type": "number",
                "tests": [
                    `"monospace"`
                ]
            },
            "height": {
                "description": "Specifies the PasswordTextBox's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    64
                ]
            },
            "heightPercent": {
                "description": "Specifies the PasswordTextBox's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    25
                ]
            },
            "hint": {
                "description": "PasswordTextBox hint for the user.",
                "type": "string",
                "tests": [
                    `"Test hint"`
                ]
            },
            "numbersOnly": {
                "description": "If true, then this PasswordTextBox`` accepts only numbers as keyboard input. Numbers can include a decimal point and an optional leading minus sign. This applies to keyboard input only. Even if NumbersOnly is true, you can set the text to anything at all using the [Text`](#PasswordTextBox.Text) property.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "passwordVisible": {
                "description": "Specifies whether the password is hidden (default) or shown.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "text": {
                "description": "The text in the PasswordTextBox, which can be set by the programmer in the Designer or Blocks Editor, or it can be entered by the user (unless the Enabled property is false).",
                "type": "string",
                "tests": [
                    `"Test text"`
                ]
            },
            "textAlignment": {
                "description": "Specifies the alignment of the PasswordTextBox's text. Valid values are 'left', 'right' and 'center'.",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "textColor": {
                "description": "Specifies the text color of the PasswordTextBox as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string.",
                "type": "color",
                "tests": [
                    "\"FF07bb70\""
                ]
            },
            "visible": {
                "description": "Specifies whether the PasswordTextBox should be visible on the screen. Value is true if the PasswordTextBox is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the PasswordTextBox, measured in pixels.",
                "type": "number",
                "tests": [
                    120
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the PasswordTextBox as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    80
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "height",
            "heightPercent",
            "passwordVisible",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "fontBold",
            "fontItalic",
            "fontTypeface",
            "heightPercent",
            "textAlignment",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "fontBold",
            "fontItalic",
            "fontTypeface",
            "textAlignment",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "requestFocus": {
                "parameters": {},
                "description": "Request focus to current PasswordTextBox.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "gotFocus": {
                "parameters": {},
                "description": "Event raised when the PasswordTextBox is selected for input, such as by the user touching it."
            },
            "lostFocus": {
                "parameters": {},
                "description": "Event raised when the PasswordTextBox is no longer selected for input, such as if the user touches a different text box."
            }
        },
        "runTimeName": "PasswordTextBox"
    },
    "screen": {
        "properties": {
            "aboutScreen": {
                "description": "Information about the screen. It appears when \"About this Application\" is selected from the system menu. Use it to tell users about your app. In multiple screen apps, each screen has its own AboutScreen info.",
                "type": "string",
                "tests": [
                    `"Test aboutScreen"`
                ]
            },
            "accentColor": {
                "description": "This is the accent color used for highlights and other user interface accents in newer versions of Android. It is set as an RRGGBB or RRGGBBAA string. Components affected by this property include dialogs created by the Notifier, the DatePicker, and others.",
                "type": "color",
                "tests": [
                    "\"FF769cc4\""
                ]
            },
            "alignHorizontal": {
                "description": "A number that encodes how contents of the screen are aligned horizontally. The choices are 'left', 'right' and 'center'",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "alignVertical": {
                "description": "A number that encodes how the contents of the arrangement are aligned vertically. The choices are 'top', 'center' and 'bottom",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "appName": {
                "description": "This is the display name of the installed application in the phone. If the AppName is blank, it will be set to the name of the project when the project is built.",
                "type": "string",
                "tests": [
                    `"Test appName"`
                ]
            },
            "backgroundColor": {
                "description": "Specifies the Screen's background color as an RRGGBB or RRGGBBAA string. If an BackgroundImage has been set, the color change will not be visible until the BackgroundImage is removed.",
                "type": "color",
                "tests": [
                    "\"FF55d94b\""
                ]
            },
            "backgroundImage": {
                "description": "Specifies the path of the Screen's background image. If there is both an BackgroundImage and a BackgroundColor specified, only the BackgroundImage will be visible.",
                "type": "string",
                "tests": [
                    `"cat.png"`
                ]
            },
            "bigDefaultText": {
                "description": "When checked, all default size text will be increased in size.",
                "type": "boolean",
                "tests": [
                    false
                ]
            },
            "blocksToolkit": {
                "description": "NOT TESTED. THIS MAY NOT WORK. A JSON string representing the subset for the screen. Authors of template apps can use this to control what components, designer properties, and blocks are available in the project.",
                "type": "string",
                "tests": [
                    `""`
                ]
            },
            "closeScreenAnimation": {
                "description": "Sets the animation type for the transition of this form closing and returning to a form behind it in the activity stack. It should be one of: 'default', 'fade', 'zoom', 'slidehorizontal', 'slidevertical', 'none'",
                "type": "string",
                "tests": [
                    `"slidehorizontal"`
                ]
            },
            "defaultFileScope": {
                "description": "Specifies the default scope used when components access files. Note that the File component has its own property for controlling file scopes. It should be one of: 'app', 'asset', 'cache', 'legacy', 'private', 'shared'",
                "type": "string",
                "tests": [
                    `"app"`
                ]
            },
            "height": {
                "description": "Returns the Screen height in pixels (y-size).",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "highContrast": {
                "description": "When checked, there will be high contrast mode turned on.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "icon": {
                "description": "The image used for your App's display icon should be a square png or jpeg image with dimensions up to 1024x1024 pixels. Larger images may cause compiling or installing the app to fail. The build server will generate images of standard dimensions for Android devices.",
                "type": "string",
                "tests": [
                    `"red.png"`
                ]
            },
            "openScreenAnimation": {
                "description": "Sets the animation type for the transition of this form opening. It should be one of: 'default', 'fade', 'zoom', 'slidehorizontal', 'slidevertical', 'none'",
                "type": "string",
                "tests": [
                    `"slidevertical"`
                ]
            },
            "platform": {
                "description": "Gets the name of the underlying platform running the app. Currently, this is the text \"Android\". Other platforms may be supported in the future.",
                "type": "string",
                "tests": [
                    "Test platform"
                ]
            },
            "platformVersion": {
                "description": "Gets the version number of the platform running the app. This is typically a dotted version number, such as 10.0. Any value can be returned, however, so you should take care to handle unexpected data. If the platform version is unavailable, the empty text will be returned.",
                "type": "string",
                "tests": [
                    "Test platformVersion"
                ]
            },
            "primaryColor": {
                "description": "This is the primary color used as part of the Android theme, including coloring the Screen's title bar.",
                "type": "color",
                "tests": [
                    "\"FFbbae45\""
                ]
            },
            "primaryColorDark": {
                "description": "This is the primary color used when the Theme property is specified to be Dark. It applies to a number of elements, including the Screen's title bar.",
                "type": "color",
                "tests": [
                    "\"FF57fdaa\""
                ]
            },
            "screenOrientation": {
                "description": "Declares the requested screen orientation, specified as a text value. Commonly used values are 'landscape', 'portrait', 'sensor', 'user' and 'unspecified'. See the Android developer documentation for the complete list of possible options. All acceptable values are: 'unspecified', 'landscape', 'portrait', 'sensor', 'user', 'behind', 'nosensor', 'fullsensor', 'reverselandscape', 'reverseportrait', 'sensorlandscape', 'sensorportrait'",
                "type": "string",
                "tests": [
                    `"portrait"`
                ]
            },
            "scrollable": {
                "description": "When checked, there will be a vertical scrollbar on the screen, and the height of the application can exceed the physical height of the device. When unchecked, the application height is constrained to the height of the device.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "showListsAsJson": {
                "description": "If true (the default), lists will be shown as strings in JSON/Python notation for example [1, \"a\", true]. If false, lists will be shown in the LISP notation, for example (1 a true).",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "showStatusBar": {
                "description": "The status bar is the topmost bar on the screen. This property reports whether the status bar is visible.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "sizing": {
                "description": "If set to responsive (the default), screen layouts will use the actual resolution of the device. See the documentation on responsive design in App Inventor for more information. If set to fixed, screen layouts will be created for a single fixed-size screen and autoscaled. NOTE: This property should appear on Screen1 only and controls the sizing for all screens in the app. Acceptable options are: 'fixed', 'responsive'",
                "type": "string",
                "tests": [
                    `"responsive"`
                ]
            },
            "theme": {
                "description": "Selects the theme for the application. Theme can only be set at compile time and the Companion will approximate changes during live development. Possible options are 'devicedefault', 'blacktitle', 'dark'.",
                "type": "string",
                "tests": [
                    `"devicedefault"`
                ]
            },
            "title": {
                "description": "Title property setter method",
                "type": "string",
                "tests": [
                    `"Test title"`
                ]
            },
            "titleVisible": {
                "description": "The title bar is the top gray bar on the screen. This property reports whether the title bar is visible.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "tutorialURL": {
                "description": "A URL which will be opened on the left side panel (which can be toggled once it is open). This is intended for projects that have an in-line tutorial as part of the project. For security reasons, only tutorials hosted on http://appinventor.mit.edu or linked to from our URL shortener (http://appinv.us) may be used here. Other URLs will be silently ignored.",
                "type": "string",
                "tests": [
                    `"https://appinventor.mit.edu/"`
                ]
            },
            "versionCode": {
                "description": "An integer value which must be incremented each time a new Android Application Package File (APK) is created for the Google Play Store.",
                "type": "number",
                "tests": [
                    1.0
                ]
            },
            "versionName": {
                "description": "A string which can be changed to allow Google Play Store users to distinguish between different versions of the App.",
                "type": "string",
                "tests": [
                    `"ButternutBiscuit"`
                ]
            },
            "width": {
                "description": "Returns the Screen width in pixels (x-size).",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"TestClass"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"TestId"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"Screen1"`
                ]
            },
            "script": {
                "description": "This is the linked JavaScript file",
                "type": "string",
                "tests": [
                    `"screen1.js"`
                ]
            }
        },
        "designerNoWrite": [
            "height",
            "platform",
            "platformVersion",
            "width"
        ],
        "codeNoRead": [
            "accentColor",
            "appName",
            "blocksToolkit",
            "defaultFileScope",
            "icon",
            "primaryColor",
            "primaryColorDark",
            "showListsAsJson",
            "sizing",
            "theme",
            "tutorialURL",
            "versionCode",
            "versionName",
            "class",
            "id",
            "name",
            "script"
        ],
        "codeNoWrite": [
            "accentColor",
            "appName",
            "blocksToolkit",
            "defaultFileScope",
            "height",
            "icon",
            "platform",
            "platformVersion",
            "primaryColor",
            "primaryColorDark",
            "showListsAsJson",
            "sizing",
            "theme",
            "tutorialURL",
            "versionCode",
            "versionName",
            "width",
            "class",
            "id",
            "name",
            "script"
        ],
        "methods": {
            "askForPermission": {
                "parameters": {
                    "permissionName": "string"
                },
                "description": "Ask the user to grant access to a sensitive permission, such as ACCESS_FINE_LOCATION. This block is typically used as part of a PermissionDenied event to ask for permission. If the user grants permission, the PermissionGranted event will be run. If the user denies permission, the PermissionDenied event will be run. Note: It is a best practice to only ask for permissions at the time they are needed, which App Inventor components will do when necessary. You should not use AskForPermission in your Initialize event unless access to that permission is critical to the behavior of your app and is needed up front, such as location services for a navigation app. Permissions are: CoarseLocation, FineLocation, MockLocation, LocationExtraCommands, ReadExternalStorage, WriteExternalStorage, Camera, Audio, Vibrate, Internet, NearFieldCommunication, Bluetooth, BluetoothAdmin, WifiState, NetworkState, ManageAccounts, GetAccounts, ReadContacts and UseCredentials",
                "tests": [
                    `"WriteExternalStorage"`
                ]
            },
            "hideKeyboard": {
                "parameters": {},
                "description": "Hide the soft keyboard",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "backPressed": {
                "parameters": {},
                "description": "Device back button pressed."
            },
            "errorOccurred": {
                "parameters": {
                    "component": "component",
                    "functionName": "string",
                    "errorNumber": "number",
                    "message": "string"
                },
                "description": "Event raised when an error occurs. Only some errors will raise this condition. For those errors, the system will show a notification by default. You can use this event handler to prescribe an error behavior different than the default."
            },
            "initialize": {
                "parameters": {},
                "description": "The Initialize event is run when the Screen starts and is only run once per screen."
            },
            "otherScreenClosed": {
                "parameters": {
                    "otherScreenName": "string",
                    "result": "any"
                },
                "description": "Event raised when another screen has closed and control has returned to this screen."
            },
            "permissionDenied": {
                "parameters": {
                    "component": "component",
                    "functionName": "string",
                    "permissionName": "string"
                },
                "description": "Event to handle when the app user has denied a needed permission."
            },
            "permissionGranted": {
                "parameters": {
                    "permissionName": "string"
                },
                "description": "Event to handle when the app user has granted a needed permission. This event is only run when permission is granted in response to the AskForPermission method."
            },
            "screenOrientationChanged": {
                "parameters": {},
                "description": "Screen orientation changed"
            }
        },
        "runTimeName": "Screen"
    },
    "slider": {
        "properties": {
            "colorLeft": {
                "description": "Specifies the color of the slider bar to the left of the thumb as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string, i.e., 0xAARRGGBB. An alpha of 00 indicates fully transparent and FF means opaque.",
                "type": "color",
                "tests": [
                    "\"FFad86aa\""
                ]
            },
            "colorRight": {
                "description": "Specifies the color of the slider bar to the right of the thumb as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string, i.e., 0xAARRGGBB. An alpha of 00 indicates fully transparent and FF means opaque.",
                "type": "color",
                "tests": [
                    "\"FF006f16\""
                ]
            },
            "heightPercent": {
                "description": "Specifies the Slider's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    25
                ]
            },
            "maxValue": {
                "description": "Sets the maximum value of slider. If the new maximum is less than the current minimum, then minimum and maximum will both be set to this value. Setting MaxValue resets the thumb position to halfway between MinValue and MaxValue and signals the PositionChanged` event.",
                "type": "number",
                "tests": [
                    100
                ]
            },
            "minValue": {
                "description": "Sets the minimum value of slider. If the new minimum is greater than the current maximum, then minimum and maximum will both be set to this value. Setting MinValue resets the thumb position to halfway between MinValue and MaxValue and signals the PositionChanged` event.",
                "type": "number",
                "tests": [
                    1
                ]
            },
            "thumbEnabled": {
                "description": "Whether or not the slider thumb is being be shown.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "thumbPosition": {
                "description": "Sets the position of the slider thumb. If this value is greater than MaxValue, then it will be set to same value as MaxValue. If this value is less than MinValue, then it will be set to same value as MinValue.",
                "type": "number",
                "tests": [
                    23
                ]
            },
            "visible": {
                "description": "Specifies whether the Slider should be visible on the screen. Value is true if the Slider is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the Slider, measured in pixels.",
                "type": "number",
                "tests": [
                    260
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the Slider as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    85
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "heightPercent",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "heightPercent",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    `"Test eventName"`,
                    `"callback"`
                ]
            }
        },
        "events": {
            "positionChanged": {
                "parameters": {
                    "thumbPosition": "number"
                },
                "description": "Indicates that position of the slider thumb has changed."
            }
        },
        "runTimeName": "Slider"
    },
    "spinner": {
        "properties": {
            "elements": {
                "description": "Specifies the list of choices to display.",
                "type": "array",
                "tests": [
                    ["choice1", "choice2", "choice3"]
                ]
            },
            "elementsFromString": {
                "description": "Set the list of choices from a string of comma-separated values.",
                "type": "string",
                "tests": [
                    `"element1,element2,element3"`
                ]
            },
            "height": {
                "description": "Specifies the Spinner's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    45
                ]
            },
            "heightPercent": {
                "description": "Specifies the Spinner's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    27
                ]
            },
            "prompt": {
                "description": "Specifies the text used for the title of the Spinner window.",
                "type": "string",
                "tests": [
                    `"Test prompt"`
                ]
            },
            "selection": {
                "description": "Specifies the current selected item in the Spinner.",
                "type": "string",
                "tests": [
                    `"element1"`
                ]
            },
            "selectionIndex": {
                "description": "Set the Spinner selection to the element at the given index. If an attempt is made to set this to a number less than 1 or greater than the number of items in the Spinner, SelectionIndex will be set to 0, and Selection will be set to the empty text.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "visible": {
                "description": "Specifies whether the Spinner should be visible on the screen. Value is true if the Spinner is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the Spinner, measured in pixels.",
                "type": "number",
                "tests": [
                    320
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the Spinner as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    98
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "elements",
            "height",
            "heightPercent",
            "selectionIndex",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "elementsFromString",
            "heightPercent",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "displayDropdown": {
                "parameters": {},
                "description": "Displays the dropdown list for selection, same action as when the user clicks on the spinner.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "afterSelecting": {
                "parameters": {
                    "selection": "string"
                },
                "description": "Event called after the user selects an item from the dropdown list."
            }
        },
        "runTimeName": "Spinner"
    },
    "switch": {
        "properties": {
            "backgroundColor": {
                "description": "Specifies the background color of the Switch as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string.",
                "type": "color",
                "tests": [
                    "\"FF1f7806\""
                ]
            },
            "enabled": {
                "description": "Specifies whether the Switch should be active and clickable.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontBold": {
                "description": "Specifies whether the text of the Switch should be bold. Some fonts do not support bold.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontItalic": {
                "description": "Specifies whether the text of the Switch should be italic. Some fonts do not support italic.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontSize": {
                "description": "Specifies the text font size of the Switch, measured in sp(scale-independent pixels).",
                "type": "number",
                "tests": [
                    24
                ]
            },
            "fontTypeface": {
                "description": "Specifies the text font face of the Switch as 'serif', 'sans serif', or 'monospace'.",
                "type": "string",
                "tests": [
                    `"monospace"`
                ]
            },
            "height": {
                "description": "Specifies the Switch's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    45
                ]
            },
            "heightPercent": {
                "description": "Specifies the Switch's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    23
                ]
            },
            "on": {
                "description": "True if the switch is in the On state, false otherwise.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "text": {
                "description": "Specifies the text displayed by the Switch.",
                "type": "string",
                "tests": [
                    `"Test text"`
                ]
            },
            "textColor": {
                "description": "Specifies the text color of the Switch as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string.",
                "type": "color",
                "tests": [
                    "\"FFe62ce7\""
                ]
            },
            "thumbColorActive": {
                "description": "Specifies the Switch's thumb color when switch is in the On state.",
                "type": "color",
                "tests": [
                    "\"FF3cc2c1\""
                ]
            },
            "thumbColorInactive": {
                "description": "Specifies the Switch's thumb color when switch is in the Off state.",
                "type": "color",
                "tests": [
                    "\"FF776818\""
                ]
            },
            "trackColorActive": {
                "description": "Specifies the Switch's track color when in the On state.",
                "type": "color",
                "tests": [
                    "\"FF01a042\""
                ]
            },
            "trackColorInactive": {
                "description": "Specifies the Switch's track color when in the Off state.",
                "type": "color",
                "tests": [
                    "\"FF7bc3f8\""
                ]
            },
            "visible": {
                "description": "Specifies whether the Switch should be visible on the screen. Value is true if the Switch is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the Switch, measured in pixels.",
                "type": "number",
                "tests": [
                    98
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the Switch as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    25
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "height",
            "heightPercent",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "fontBold",
            "fontItalic",
            "fontTypeface",
            "heightPercent",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "fontBold",
            "fontItalic",
            "fontTypeface",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "changed": {
                "parameters": {},
                "description": "User change the state of the Switch from On to Off or back."
            },
            "gotFocus": {
                "parameters": {},
                "description": "Switch became the focused component."
            },
            "lostFocus": {
                "parameters": {},
                "description": "Switch stopped being the focused component."
            }
        },
        "runTimeName": "Switch"
    },
    "textbox": {
        "properties": {
            "backgroundColor": {
                "description": "The background color of the `TextBox``. You can choose a color by name in the Designer or in the Blocks Editor. The default background color is 'default' (shaded 3-D look).",
                "type": "color",
                "tests": [
                    "\"FFa757a3\""
                ]
            },
            "enabled": {
                "description": "If set, user can enter text into the TextBox.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontBold": {
                "description": "Specifies whether the text of the TextBox should be bold. Some fonts do not support bold.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontItalic": {
                "description": "Specifies whether the text of the TextBox should be italic. Some fonts do not support italic.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontSize": {
                "description": "Specifies the text font size of the TextBox, measured in sp(scale-independent pixels).",
                "type": "number",
                "tests": [
                    24
                ]
            },
            "fontTypeface": {
                "description": "The text font face of the TextBox. Valid values are 0 (default), 1 (serif), 2 (sans serif), or 3 (monospace).",
                "type": "string",
                "tests": [
                    `"monospace"`
                ]
            },
            "height": {
                "description": "Specifies the TextBox's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    65
                ]
            },
            "heightPercent": {
                "description": "Specifies the TextBox's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    25
                ]
            },
            "hint": {
                "description": "TextBox hint for the user.",
                "type": "string",
                "tests": [
                    `"Test hint"`
                ]
            },
            "multiLine": {
                "description": "If true, then this TextBox accepts multiple lines of input, which are entered using the return key. For single line text boxes there is a Done key instead of a return key, and pressing Done hides the keyboard. The app should call the HideKeyboard method to hide the keyboard for a mutiline text box.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "numbersOnly": {
                "description": "If true, then this TextBox`` accepts only numbers as keyboard input. Numbers can include a decimal point and an optional leading minus sign. This applies to keyboard input only. Even if NumbersOnly is true, you can set the text to anything at all using the [Text`](#TextBox.Text) property.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "readOnly": {
                "description": "Whether the TextBox is read-only. By default, this is true.",
                "type": "boolean",
                "tests": [
                    false
                ]
            },
            "text": {
                "description": "The text in the TextBox, which can be set by the programmer in the Designer or Blocks Editor, or it can be entered by the user (unless the Enabled property is false).",
                "type": "string",
                "tests": [
                    `"Test text"`
                ]
            },
            "textAlignment": {
                "description": "Specifies the alignment of the TextBox's text. Valid values are 'left', 'right' and 'center'.",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "textColor": {
                "description": "Specifies the text color of the TextBox as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string.",
                "type": "color",
                "tests": [
                    "\"FF32844c\""
                ]
            },
            "visible": {
                "description": "Specifies whether the TextBox should be visible on the screen. Value is true if the TextBox is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the TextBox, measured in pixels.",
                "type": "number",
                "tests": [
                    213
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the TextBox as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    84
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "height",
            "heightPercent",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "fontBold",
            "fontItalic",
            "fontTypeface",
            "heightPercent",
            "textAlignment",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "fontBold",
            "fontItalic",
            "fontTypeface",
            "textAlignment",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "hideKeyboard": {
                "parameters": {},
                "description": "Hide the keyboard. Only multiline text boxes need this. Single line text boxes close the keyboard when the users presses the Done key.",
                "tests": []
            },
            "requestFocus": {
                "parameters": {},
                "description": "Request focus to current TextBox.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "gotFocus": {
                "parameters": {},
                "description": "Event raised when the TextBox is selected for input, such as by the user touching it."
            },
            "lostFocus": {
                "parameters": {},
                "description": "Event raised when the TextBox is no longer selected for input, such as if the user touches a different text box."
            }
        },
        "runTimeName": "TextBox"
    },
    "timepicker": {
        "properties": {
            "backgroundColor": {
                "description": "Specifies the TimePicker's background color as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string. If an Image has been set, the color change will not be visible until the Image is removed.",
                "type": "color",
                "tests": [
                    "\"FF4a4875\""
                ]
            },
            "enabled": {
                "description": "Specifies whether the TimePicker should be active and clickable.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontBold": {
                "description": "Specifies whether the text of the TimePicker should be bold. Some fonts do not support bold.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontItalic": {
                "description": "Specifies whether the text of the TimePicker should be italic. Some fonts do not support italic.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontSize": {
                "description": "Specifies the text font size of the TimePicker, measured in sp(scale-independent pixels).",
                "type": "number",
                "tests": [
                    24
                ]
            },
            "fontTypeface": {
                "description": "Specifies the text font face of the TimePicker as 'serif', 'sans serif', or 'monospace'.",
                "type": "string",
                "tests": [
                    `"monospace"`
                ]
            },
            "height": {
                "description": "Specifies the TimePicker's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    23
                ]
            },
            "heightPercent": {
                "description": "Specifies the TimePicker's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    23
                ]
            },
            "hour": {
                "description": "Returns the hour of the time that was last picked using the `TimePicker``. The time returned is always in the 24hour format.",
                "type": "number",
                "tests": [
                    1
                ]
            },
            "image": {
                "description": "Specifies the path of the TimePicker's image. If there is both an Image and a BackgroundColor specified, only the Image will be visible.",
                "type": "string",
                "tests": [
                    `"cat.png"`
                ]
            },
            "instant": {
                "description": "Returns the instant in time that was last picked using the TimePicker.",
                "type": "InstantInTime",
                "tests": [
                    1564642
                ]
            },
            "minute": {
                "description": "Returns the hour of the time that was last picked using the TimePicker. The time returned is always in the 24hour format.",
                "type": "number",
                "tests": [
                    23
                ]
            },
            "shape": {
                "description": "Specifies the shape of the TimePicker. The valid values for this property are'round', 'rectangle' and 'oval'. The Shape will not be visible if an Image is used.",
                "type": "string",
                "tests": [
                    `"oval"`
                ]
            },
            "showFeedback": {
                "description": "Specifies if a visual feedback should be shown when a TimePicker with an assigned Image is pressed.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "text": {
                "description": "Specifies the text displayed by the TimePicker.",
                "type": "string",
                "tests": [
                    `"Test text"`
                ]
            },
            "textAlignment": {
                "description": "Specifies the alignment of the TimePicker's text. Valid values are 'left', 'right' and 'center'.",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "textColor": {
                "description": "Specifies the text color of the TimePicker as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string.",
                "type": "color",
                "tests": [
                    "\"FF9d10bc\""
                ]
            },
            "visible": {
                "description": "Specifies whether the TimePicker should be visible on the screen. Value is true if the TimePicker is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the TimePicker, measured in pixels.",
                "type": "number",
                "tests": [
                    423
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the TimePicker as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    24
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "height",
            "heightPercent",
            "hour",
            "instant",
            "minute",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "fontTypeface",
            "heightPercent",
            "shape",
            "textAlignment",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "fontTypeface",
            "hour",
            "instant",
            "minute",
            "shape",
            "textAlignment",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "launchPicker": {
                "parameters": {},
                "description": "Launches the TimePicker dialog.",
                "tests": []
            },
            "setTimeToDisplay": {
                "parameters": {
                    "hour": "number",
                    "minute": "number"
                },
                "description": "Allows the user to set the time to be displayed when the TimePicker opens. Valid values for the hour field are 0-23 and 0-59 for the second field.",
                "tests": [
                    0,
                    0
                ]
            },
            "setTimeToDisplayFromInstant": {
                "parameters": {
                    "instant": "InstantInTime"
                },
                "description": "Allows the instant to set the hour and minute to be displayed when the TimePicker opens. Instants are used in Clock, DatePicker, and TimePicker components.",
                "tests": [
                    "InstantInTime"
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "afterTimeSet": {
                "parameters": {},
                "description": "This event is run when a user has set the time in the popup dialog."
            },
            "gotFocus": {
                "parameters": {},
                "description": "Indicates the cursor moved over the TimePicker so it is now possible to click it."
            },
            "lostFocus": {
                "parameters": {},
                "description": "Indicates the cursor moved away from the TimePicker so it is now no longer possible to click it."
            },
            "touchDown": {
                "parameters": {},
                "description": "Indicates that the TimePicker was pressed down."
            },
            "touchUp": {
                "parameters": {},
                "description": "Indicates that the TimePicker has been released."
            }
        },
        "runTimeName": "TimePicker"
    },
    "webviewer": {
        "properties": {
            "currentPageTitle": {
                "description": "Returns the title of the page currently being viewed",
                "type": "string",
                "tests": [
                    `"Test currentPageTitle"`
                ]
            },
            "currentUrl": {
                "description": "Returns the URL currently being viewed. This could be different from the HomeUrl if new pages were visited by following links.",
                "type": "string",
                "tests": [
                    `"Test currentUrl"`
                ]
            },
            "followLinks": {
                "description": "Determines whether to follow links when they are tapped in the WebViewer. If you follow links, you can use GoBack and GoForward to navigate the browser history.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "height": {
                "description": "Specifies the WebViewer's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    200
                ]
            },
            "heightPercent": {
                "description": "Specifies the WebViewer's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    50
                ]
            },
            "homeUrl": {
                "description": "Specifies the URL of the page the WebViewer should initially open to. Setting this will load the page.",
                "type": "string",
                "tests": [
                    `"Test homeUrl"`
                ]
            },
            "ignoreSslErrors": {
                "description": "Determine whether or not to ignore SSL errors. Set to true to ignore errors. Use this to accept self signed certificates from websites.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "promptForPermission": {
                "description": "Determine if the user should be prompted for permission to use the geolocation API while in the WebViewer. If true, prompt the user of the WebViewer to give permission to access the geolocation API. If false, assume permission is granted.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "usesLocation": {
                "description": "Specifies whether or not this WebViewer can access the JavaScript geolocation API.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "visible": {
                "description": "Specifies whether the WebViewer should be visible on the screen. Value is true if the WebViewer is showing and false if hidden.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "webViewString": {
                "description": "Gets the WebView's String, which is viewable through Javascript in the WebView as the window.AppInventor object.",
                "type": "string",
                "tests": [
                    `"Test webViewString"`
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the WebViewer, measured in pixels.",
                "type": "number",
                "tests": [
                    523
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the WebViewer as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    26
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "currentPageTitle",
            "currentUrl",
            "height",
            "heightPercent",
            "webViewString",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "heightPercent",
            "usesLocation",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "currentPageTitle",
            "currentUrl",
            "usesLocation",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "canGoBack": {
                "parameters": {},
                "description": "Returns true if the WebViewer can go back in the history list.",
                "tests": []
            },
            "canGoForward": {
                "parameters": {},
                "description": "Returns true if the WebViewer can go forward in the history list.",
                "tests": []
            },
            "clearCaches": {
                "parameters": {},
                "description": "Clear the internal webview cache, both ram and disk. This is useful when using the WebViewer to poll a page that may not be sending appropriate cache control headers.",
                "tests": []
            },
            "clearCookies": {
                "parameters": {},
                "description": "Clear the webview's cookies. This is useful if you want to sign the user out of a website that uses them to store logins.",
                "tests": []
            },
            "clearLocations": {
                "parameters": {},
                "description": "Clear Stored Location permissions. When the geolocation API is used in the WebViewer, the end user is prompted on a per URL basis for whether or not permission should be granted to access their location. This function clears this information for all locations. As the permissions interface is not available on phones older then Eclair, this function is a no-op on older phones.",
                "tests": []
            },
            "goBack": {
                "parameters": {},
                "description": "Go back to the previous page in the history list. Does nothing if there is no previous page.",
                "tests": []
            },
            "goForward": {
                "parameters": {},
                "description": "Go forward to the next page in the history list. Does nothing if there is no next page.",
                "tests": []
            },
            "goHome": {
                "parameters": {},
                "description": "Loads the page from the home URL. This happens automatically when home URL is changed.",
                "tests": []
            },
            "goToUrl": {
                "parameters": {
                    "url": "string"
                },
                "description": "Load the page at the given URL.",
                "tests": [
                    `"http://www.google.com"`
                ]
            },
            "reload": {
                "parameters": {},
                "description": "Reload the current page.",
                "tests": []
            },
            "runJavaScript": {
                "parameters": {
                    "js": "string"
                },
                "description": "Run JavaScript in the current page.",
                "tests": [
                    `"alert('hello');"`
                ]
            },
            "stopLoading": {
                "parameters": {},
                "description": "Stop loading a page.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "beforePageLoad": {
                "parameters": {
                    "url": "string"
                },
                "description": "When a page is about to load this event is run."
            },
            "errorOccurred": {
                "parameters": {
                    "errorCode": "number",
                    "description": "string",
                    "failingUrl": "string"
                },
                "description": "When an error occurs this event is run."
            },
            "pageLoaded": {
                "parameters": {
                    "url": "string"
                },
                "description": "When a page is finished loading this event is run."
            },
            "webViewStringChange": {
                "parameters": {
                    "value": "string"
                },
                "description": "Event that runs when the AppInventor.setWebViewString method is called from JavaScript. The new WebViewString is given by the value parameter."
            }
        },
        "runTimeName": "WebViewer"
    },
    "accelerometersensor": {
        "properties": {
            "available": {
                "description": "Returns whether the AccelerometerSensor hardware is available on the device.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "enabled": {
                "description": "Specifies whether the sensor should generate events. If true, the sensor will generate events. Otherwise, no events are generated even if the device is accelerated or shaken.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "legacyMode": {
                "description": "Prior to the release that added this property the AccelerometerSensor component passed through sensor values directly as received from the Android system. However these values do not compensate for tablets that default to Landscape mode, requiring the MIT App Inventor programmer to compensate. However compensating would result in incorrect results in Portrait mode devices such as phones. We now detect Landscape mode tablets and perform the compensation. However if your project is already compensating for the change, you will now get incorrect results. Although our preferred solution is for you to update your project, you can also just set this property to “true” and our compensation code will be deactivated. Note:  We recommend that you update your project as we may remove this property in a future release.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "minimumInterval": {
                "description": "Specifies the minimum interval required between back-to-back Shaking events, in milliseconds. Once the phone starts being shaken, all further Shaking events will be ignored until the interval has elapsed.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "sensitivity": {
                "description": "Specifies the sensitivity of the accelerometer. Valid values are 'weak', 'moderate' and 'strong'. Can only be read after screen initialized.",
                "type": "string",
                "tests": [
                    `"weak"`
                ]
            },
            "xAccel": {
                "description": "Returns the acceleration in the X-dimension in SI units (m/s²). The sensor must be enabled to return meaningful values.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "yAccel": {
                "description": "Returns the acceleration in the Y-dimension in SI units (m/s²). The sensor must be enabled to return meaningful values.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "zAccel": {
                "description": "Returns the acceleration in the Z-dimension in SI units (m/s²). The sensor must be enabled to return meaningful values.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "available",
            "xAccel",
            "yAccel",
            "zAccel"
        ],
        "codeNoRead": [
            "legacyMode",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "available",
            "legacyMode",
            "xAccel",
            "yAccel",
            "zAccel",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "accelerationChanged": {
                "parameters": {
                    "xAccel": "number",
                    "yAccel": "number",
                    "zAccel": "number"
                },
                "description": "Indicates the acceleration changed in the X, Y, and/or Z dimensions."
            },
            "shaking": {
                "parameters": {},
                "description": "Indicates the device started being shaken or continues to be shaken."
            }
        },
        "runTimeName": "AccelerometerSensor"
    },
    "barcodescanner": {
        "properties": {
            "result": {
                "description": "Gets the text result of the previous scan.",
                "type": "string",
                "tests": [
                    `"Test result"`
                ]
            },
            "useExternalScanner": {
                "description": "Set whether or not you wish to use an External Scanning program such as Bar Code Scanner. If false a version of ZXing integrated into App Inventor will be used.",
                "type": "boolean",
                "tests": [
                    false
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "result"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "result",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "doScan": {
                "parameters": {},
                "description": "Begins a barcode scan, using the camera. When the scan is complete, the AfterScan event will be raised.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "afterScan": {
                "parameters": {
                    "result": "string"
                },
                "description": "Indicates that the scanner has read a (text) result and provides the result"
            }
        },
        "runTimeName": "BarcodeScanner"
    },
    "barometer": {
        "properties": {
            "airPressure": {
                "description": "The atmospheric pressure in hPa (millibar), if the sensor is available and enabled.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "available": {
                "description": "Specifies whether or not the device has the hardware to support the Barometer component.",
                "type": "boolean",
                "tests": [
                    false
                ]
            },
            "enabled": {
                "description": "Specifies whether the sensor should generate events. If true, the sensor will generate events. Otherwise, no events are generated.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "refreshTime": {
                "description": "The requested minimum time in milliseconds between changes in readings being reported. Android is not guaranteed to honor the request. Setting this property has no effect on pre-Gingerbread devices.",
                "type": "number",
                "tests": [
                    1000
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "airPressure",
            "available"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "airPressure",
            "available",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "airPressureChanged": {
                "parameters": {
                    "pressure": "number"
                },
                "description": "Called when a change is detected in the air pressure (provided in hPa)."
            }
        },
        "runTimeName": "Barometer"
    },
    "clock": {
        "properties": {
            "timerAlwaysFires": {
                "description": "Will fire even when application is not showing on the screen if true",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "timerEnabled": {
                "description": "Specifies whether the Timer event should run.",
                "type": "boolean",
                "tests": [
                    false
                ]
            },
            "timerInterval": {
                "description": "Specifies the interval between subsequent Timer events. Note: Drift may occur over time and that the system may not honor the timing specified here if the app or another process on the phone is busy.",
                "type": "number",
                "tests": [
                    1000
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addDays": {
                "parameters": {
                    "instant": "InstantInTime",
                    "quantity": "number"
                },
                "description": "Returns an instant in time some days after the given instant.",
                "tests": [
                    0,
                    100
                ]
            },
            "addDuration": {
                "parameters": {
                    "instant": "InstantInTime",
                    "quantity": "number"
                },
                "description": "Returns an instant in time some duration after the argument",
                "tests": [
                    0,
                    1000
                ]
            },
            "addHours": {
                "parameters": {
                    "instant": "InstantInTime",
                    "quantity": "number"
                },
                "description": "Returns an instant in time some hours after the given instant.",
                "tests": [
                    0,
                    1000
                ]
            },
            "addMinutes": {
                "parameters": {
                    "instant": "InstantInTime",
                    "quantity": "number"
                },
                "description": "Returns an instant in time some minutes after the given instant.",
                "tests": [
                    0,
                    10000
                ]
            },
            "addMonths": {
                "parameters": {
                    "instant": "InstantInTime",
                    "quantity": "number"
                },
                "description": "Returns an instant in time some months after the given instant.",
                "tests": [
                    0,
                    10000
                ]
            },
            "addSeconds": {
                "parameters": {
                    "instant": "InstantInTime",
                    "quantity": "number"
                },
                "description": "Returns an instant in time some seconds after the given instant.",
                "tests": [
                    1,
                    100000
                ]
            },
            "addWeeks": {
                "parameters": {
                    "instant": "InstantInTime",
                    "quantity": "number"
                },
                "description": "Returns An instant in time some weeks after the given instant.",
                "tests": [
                    0,
                    100000
                ]
            },
            "addYears": {
                "parameters": {
                    "instant": "InstantInTime",
                    "quantity": "number"
                },
                "description": "Returns an instant in time some years after the given instant.",
                "tests": [
                    0,
                    10000
                ]
            },
            "dayOfMonth": {
                "parameters": {
                    "instant": "InstantInTime"
                },
                "description": "Returns the day of the month.",
                "tests": [
                    0
                ]
            },
            "duration": {
                "parameters": {
                    "start": "InstantInTime",
                    "end": "InstantInTime"
                },
                "description": "Returns the milliseconds by which end follows start (+ or -)",
                "tests": [
                    0,
                    1000
                ]
            },
            "durationToDays": {
                "parameters": {
                    "duration": "number"
                },
                "description": "Returns the duration converted from milliseconds to days.",
                "tests": [
                    3245673412
                ]
            },
            "durationToHours": {
                "parameters": {
                    "duration": "number"
                },
                "description": "Returns the duration converted from milliseconds to hours.",
                "tests": [
                    5231323
                ]
            },
            "durationToMinutes": {
                "parameters": {
                    "duration": "number"
                },
                "description": "Returns the duration converted from milliseconds to minutes.",
                "tests": [
                    5432452
                ]
            },
            "durationToSeconds": {
                "parameters": {
                    "duration": "number"
                },
                "description": "Returns the duration converted from milliseconds to seconds.",
                "tests": [
                    253256353
                ]
            },
            "durationToWeeks": {
                "parameters": {
                    "duration": "number"
                },
                "description": "Returns the duration converted from milliseconds to weeks.",
                "tests": [
                    2453253
                ]
            },
            "formatDate": {
                "parameters": {
                    "instant": "InstantInTime",
                    "pattern": "string"
                },
                "description": "Converts and formats an instant into a string of date with the specified pattern. To learn more about valid patterns, please see SimpleDateFormat. https://developer.android.com/reference/java/text/SimpleDateFormat",
                "tests": [
                    0,
                    `"yyMMddHHmmssZ"`
                ]
            },
            "formatDateTime": {
                "parameters": {
                    "instant": "InstantInTime",
                    "pattern": "string"
                },
                "description": "Converts and formats an instant into a string of date and time with the specified pattern. To learn more about valid patterns, please see SimpleDateFormat. https://developer.android.com/reference/java/text/SimpleDateFormat",
                "tests": [
                    0,
                    `"yyMMddHHmmssZ"`
                ]
            },
            "formatTime": {
                "parameters": {
                    "instant": "InstantInTime"
                },
                "description": "Converts and formats the given instant into a string with the specified pattern. To learn more about valid patterns, please see SimpleDateFormat. https://developer.android.com/reference/java/text/SimpleDateFormat",
                "tests": [
                    `0`
                ]
            },
            "getMillis": {
                "parameters": {
                    "instant": "InstantInTime"
                },
                "description": "Returns the instant in time measured as milliseconds since 1970.",
                "tests": [
                    14123
                ]
            },
            "hour": {
                "parameters": {
                    "instant": "InstantInTime"
                },
                "description": "Returns the hours for the given date.",
                "tests": [
                    37653
                ]
            },
            "makeDate": {
                "parameters": {
                    "year": "number",
                    "month": "number",
                    "day": "number"
                },
                "description": "Returns an instant in time specified by year, month, date in UTC. Valid values for the month field are 1-12 and 1-31 for the day field.",
                "tests": [
                    1970,
                    1,
                    1
                ]
            },
            "makeInstant": {
                "parameters": {
                    "from": "string"
                },
                "description": "Returns an instant in time specified by MM/dd/YYYY hh:mm:ss or MM/dd/YYYY or hh:mm.",
                "tests": [
                    `"01/01/1970 12:15:12"`
                ]
            },
            "makeInstantFromMillis": {
                "parameters": {
                    "millis": "number"
                },
                "description": "Returns an instant in time specified by the milliseconds since 1970 in UTC.",
                "tests": [
                    5243543131
                ]
            },
            "makeInstantFromParts": {
                "parameters": {
                    "year": "number",
                    "month": "number",
                    "day": "number",
                    "hour": "number",
                    "minute": "number",
                    "second": "number"
                },
                "description": "Returns an instant in time specified by year, month, date, hour, minute, second in UTC.",
                "tests": [
                    1970,
                    1,
                    1,
                    12,
                    15,
                    32
                ]
            },
            "makeTime": {
                "parameters": {
                    "hour": "number",
                    "minute": "number",
                    "second": "number"
                },
                "description": "Returns an instant in time specified by hour, minute, second in UTC.",
                "tests": [
                    12,
                    32,
                    19
                ]
            },
            "minute": {
                "parameters": {
                    "instant": "InstantInTime"
                },
                "description": "Returns the minutes for the given date.",
                "tests": [
                    0
                ]
            },
            "month": {
                "parameters": {
                    "instant": "InstantInTime"
                },
                "description": "Returns the number of the month for the given instant.",
                "tests": [
                    0
                ]
            },
            "monthName": {
                "parameters": {
                    "instant": "InstantInTime"
                },
                "description": "Returns the name of the month for the given instant.",
                "tests": [
                    0
                ]
            },
            "now": {
                "parameters": {},
                "description": "Returns the current instant in time read from phone's clock.",
                "tests": []
            },
            "second": {
                "parameters": {
                    "instant": "InstantInTime"
                },
                "description": "Returns the seconds for the given instant.",
                "tests": [
                    0
                ]
            },
            "systemTime": {
                "parameters": {},
                "description": "Returns the phone's internal time.",
                "tests": []
            },
            "weekday": {
                "parameters": {
                    "instant": "InstantInTime"
                },
                "description": "Returns the weekday for the given instant.",
                "tests": [
                    0
                ]
            },
            "weekdayName": {
                "parameters": {
                    "instant": "InstantInTime"
                },
                "description": "Returns the name of the weekday for the given instant.",
                "tests": [
                    0
                ]
            },
            "year": {
                "parameters": {
                    "instant": "InstantInTime"
                },
                "description": "Returns the year of the given instant.",
                "tests": [
                    0
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "timer": {
                "parameters": {},
                "description": "The Timer event runs when the timer has gone off."
            }
        },
        "runTimeName": "Clock"
    },
    "gyroscopesensor": {
        "properties": {
            "available": {
                "description": "Indicates whether a gyroscope sensor is available.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "enabled": {
                "description": "Enabled property getter method.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "xAngularVelocity": {
                "description": "The angular velocity around the X axis, in degrees per second.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "yAngularVelocity": {
                "description": "The angular velocity around the Y axis, in degrees per second.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "zAngularVelocity": {
                "description": "The angular velocity around the Z axis, in degrees per second.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "available",
            "xAngularVelocity",
            "yAngularVelocity",
            "zAngularVelocity"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "available",
            "xAngularVelocity",
            "yAngularVelocity",
            "zAngularVelocity",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "gyroscopeChanged": {
                "parameters": {
                    "xAngularVelocity": "number",
                    "yAngularVelocity": "number",
                    "zAngularVelocity": "number",
                    "timestamp": "number"
                },
                "description": "Indicates that the gyroscope sensor data has changed. The timestamp parameter is the time in nanoseconds at which the event occurred."
            }
        },
        "runTimeName": "GyroscopeSensor"
    },
    "hygrometer": {
        "properties": {
            "available": {
                "description": "Specifies whether or not the device has the hardware to support the Hygrometer component.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "enabled": {
                "description": "Specifies whether the sensor should generate events. If true, the sensor will generate events. Otherwise, no events are generated.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "humidity": {
                "description": "Returns the relative ambient humidity as a percentage. The sensor must be enabled and available to return meaningful values.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "refreshTime": {
                "description": "The requested minimum time in milliseconds between changes in readings being reported. Android is not guaranteed to honor the request. Setting this property has no effect on pre-Gingerbread devices.",
                "type": "number",
                "tests": [
                    1000
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "available",
            "humidity"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "available",
            "humidity",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "humidityChanged": {
                "parameters": {
                    "humidity": "number"
                },
                "description": "Indicates the relative humidity changed."
            }
        },
        "runTimeName": "Hygrometer"
    },
    "lightsensor": {
        "properties": {
            "available": {
                "description": "Specifies whether or not the device has the hardware to support the LightSensor component.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "averageLux": {
                "description": "Returns the brightness in lux by averaging the previous 10 measured values. The sensor must be enabled and available to return meaningful values.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "enabled": {
                "description": "Specifies whether the sensor should generate events. If true, the sensor will generate events. Otherwise, no events are generated.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "lux": {
                "description": "Returns the last measured brightness in lux. The sensor must be enabled and available to return meaningful values.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "refreshTime": {
                "description": "The requested minimum time in milliseconds between changes in readings being reported. Android is not guaranteed to honor the request. Setting this property has no effect on pre-Gingerbread devices.",
                "type": "number",
                "tests": [
                    1000
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "available",
            "averageLux",
            "lux"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "available",
            "averageLux",
            "lux",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "lightChanged": {
                "parameters": {
                    "lux": "number"
                },
                "description": "Indicates the light level changed."
            }
        },
        "runTimeName": "LightSensor"
    },
    "locationsensor": {
        "properties": {
            "accuracy": {
                "description": "The LocationSensor will be able to locate the device with a varying degree of confidence, based on the quality of satellite, cell towers, and other data used to estimate location. The Accuracy value is the radius in meters around the sensor's detected location. The device has a 68% chance to be located within this radius. More precise location detection will result in a smaller accuracy number, which allows the app to have more confidence where the device is actually located. If the accuracy is not known, the return value is 0.0",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "altitude": {
                "description": "Altitude of the device measured in meters, if available. Altitude is measured from the World Geodetic System 84 reference ellipsoid, not sea level. Note that it is difficult for devices to accurately sense altitude. Altitude reported on a phone/tablet can easily be off by 30 meters or more.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "availableProviders": {
                "description": "List of available service providers, such as gps or network. This information is provided as a list and in text form.",
                "type": "array",
                "tests": [
                    "array"
                ]
            },
            "currentAddress": {
                "description": "Physical street address of the device from Google's map database. The address might not always be available from the provider, and the address reported may not always be of the building where the device is located. If Google has no address information available for a particular location, this will return No address available.",
                "type": "string",
                "tests": [
                    "Test currentAddress"
                ]
            },
            "distanceInterval": {
                "description": "Determines the minimum distance interval, in meters, that the sensor will try to use for sending out location updates. For example, if this is set to 50, then the sensor will fire a LocationChanged event only after 50 meters have been traversed. However, the sensor does not guarantee that an update will be received at exactly the distance interval. It may take more than 5 meters to fire an event, for instance. It is also useful to check against Accuracy when using this property. When your device is moving, the accuracy of the detected location is constantly changing.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "enabled": {
                "description": "If true, the LocationSensor will attempt to read location information from GPS, WiFi location, or other means available on the device. This setting does not control whether location information is actually available. Device location must be enabled or disabled in the device settings.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "hasAccuracy": {
                "description": "If true, the device can report its accuracy level.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "hasAltitude": {
                "description": "If true, the device can report its altitude.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "hasLongitudeLatitude": {
                "description": "If true, the device can report longitude and latitude. It is always the case that either both or neither are.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "latitude": {
                "description": "The most recently available latitude value in degrees reported to 5 decimal places. If no value is available, 0 will be returned. Latitude is a value between 90 (north) and -90 (south), where 0 marks the Equator.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "longitude": {
                "description": "The most recent available longitude value in degrees reported to 5 decimal places. If no value is available, 0 will be returned. Longitude is a value between 180 (east) and -180 (west), where 0 marks the Prime Meridian.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "providerLocked": {
                "description": "The device will not change the service provider. It is possible for a device to switch service providers when the current provider is unable to provide adequate location information. ProviderLocked is a Boolean value: true/false. Set to true to prevent providers from changing. Set to false to allow for automatic switching when necessary.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "providerName": {
                "description": "The current service provider. The provider will most likely be either GPS or network.",
                "type": "string",
                "tests": [
                    "Test providerName"
                ]
            },
            "timeInterval": {
                "description": "Determines the minimum time interval, in milliseconds, that the sensor will try to use for sending out location updates. However, location updates will only be received when the location of the phone actually changes, and use of the specified time interval is not guaranteed. For example, if 30000 is used as the time interval, location updates will never be fired sooner than 30000ms, but they may be fired anytime after. Values smaller than 30000ms (30 seconds) are not practical for most devices. Small values may drain battery and overwork the GPS.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "accuracy",
            "altitude",
            "availableProviders",
            "currentAddress",
            "hasAccuracy",
            "hasAltitude",
            "hasLongitudeLatitude",
            "latitude",
            "longitude",
            "providerLocked",
            "providerName"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "accuracy",
            "altitude",
            "availableProviders",
            "currentAddress",
            "hasAccuracy",
            "hasAltitude",
            "hasLongitudeLatitude",
            "latitude",
            "longitude",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "latitudeFromAddress": {
                "parameters": {
                    "locationName": "string"
                },
                "description": "Derives latitude from the given locationName.",
                "tests": [
                    "Test locationName"
                ]
            },
            "longitudeFromAddress": {
                "parameters": {
                    "locationName": "string"
                },
                "description": "Derives longitude from the given locationName.",
                "tests": [
                    "Test locationName"
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "locationChanged": {
                "parameters": {
                    "latitude": "number",
                    "longitude": "number",
                    "altitude": "number",
                    "speed": "number"
                },
                "description": "Indicates that a new location has been detected. Speed is reported in meters/second Other values match their properties."
            },
            "statusChanged": {
                "parameters": {
                    "provider": "string",
                    "status": "string"
                },
                "description": "Indicates that the status of the location provider service has changed, such as when a provider is lost or a new provider starts being used."
            }
        },
        "runTimeName": "LocationSensor"
    },
    "magneticfieldsensor": {
        "properties": {
            "absoluteStrength": {
                "description": "Indicates the absolute strength of the field.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "available": {
                "description": "Indicates that there is a magnetic field sensor in the device and it is available.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "enabled": {
                "description": "Indicates whether or not the magnetic field sensor is enabled and working.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "maximumRange": {
                "description": "Indicates the maximum range the magnetic sensor can reach.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "xStrength": {
                "description": "Indicates the field's strength in the X-axis.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "yStrength": {
                "description": "Indicates the field's strength in the Y-axis.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "zStrength": {
                "description": "Indicates the field's strength in the Z-axis.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "absoluteStrength",
            "available",
            "maximumRange",
            "xStrength",
            "yStrength",
            "zStrength"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "absoluteStrength",
            "available",
            "maximumRange",
            "xStrength",
            "yStrength",
            "zStrength",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "magneticChanged": {
                "parameters": {
                    "xStrength": "number",
                    "yStrength": "number",
                    "zStrength": "number",
                    "absoluteStrength": "number"
                },
                "description": "Triggers when magnetic field has changed, setting the new values in parameters."
            }
        },
        "runTimeName": "MagneticFieldSensor"
    },
    "nearfield": {
        "properties": {
            "lastMessage": {
                "description": "Returns the content of the most recently received tag.",
                "type": "string",
                "tests": [
                    `"Test lastMessage"`
                ]
            },
            "readMode": {
                "description": "Specifies whether the NFC hardware should operate in read mode (true) or write mode (false)",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "textToWrite": {
                "description": "Specifies the content that will be written to the tag when in write mode. This method has no effect if ReadMode is true.",
                "type": "string",
                "tests": [
                    `"Test textToWrite"`
                ]
            },
            "writeType": {
                "description": "Returns the write type for the NFC component. For this version of the component, it is always 1.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "lastMessage",
            "textToWrite",
            "writeType"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "lastMessage",
            "writeType",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "tagRead": {
                "parameters": {
                    "message": "string"
                },
                "description": "Indicates that a new tag has been detected. Currently this is only a plain text tag, as specified in the manifest."
            },
            "tagWritten": {
                "parameters": {},
                "description": "Indicates that a tag has come into range of the NFC sensor and has been written."
            }
        },
        "runTimeName": "NearField"
    },
    "orientationsensor": {
        "properties": {
            "angle": {
                "description": "Returns an angle that tells the direction in which the device is tiled. That is, it tells the direction of the force that would be felt by a ball rolling on the surface of the device.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "available": {
                "description": "Indicates whether the orientation sensor is present on the device.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "azimuth": {
                "description": "Returns the azimuth angle of the device. To return meaningful values the sensor must be enabled.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "enabled": {
                "description": "Specifies whether the orientation sensor is enabled.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "magnitude": {
                "description": "Returns a number between 0 and 1 indicating how much the device is tilted. It gives the magnitude of the force that would be felt by a ball rolling on the surface of the device. For the angle of tilt, use Angle.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "pitch": {
                "description": "Returns the pitch angle of the device. To return meaningful values the sensor must be enabled.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "roll": {
                "description": "Returns the roll angle of the device. To return meaningful values the sensor must be enabled.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "angle",
            "available",
            "azimuth",
            "magnitude",
            "pitch",
            "roll"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "angle",
            "available",
            "azimuth",
            "magnitude",
            "pitch",
            "roll",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "orientationChanged": {
                "parameters": {
                    "azimuth": "number",
                    "pitch": "number",
                    "roll": "number"
                },
                "description": "The OrientationChanged event handler is run when the orientation has changed."
            }
        },
        "runTimeName": "OrientationSensor"
    },
    "pedometer": {
        "properties": {
            "distance": {
                "description": "Returns the approximate distance traveled in meters.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "elapsedTime": {
                "description": "Returns the time elapsed in milliseconds since the pedometer has started.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "simpleSteps": {
                "description": "Returns the number of simple steps taken since the pedometer has started.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "stopDetectionTimeout": {
                "description": "Returns the duration of idleness (no steps detected) after which to go into a \"stopped\" state.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "strideLength": {
                "description": "Returns the current estimate of stride length in meters, if calibrated, or returns the default (0.73 m) otherwise.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "walkSteps": {
                "description": "Returns the number of walk steps taken since the pedometer has started.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "distance",
            "elapsedTime",
            "simpleSteps",
            "walkSteps"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "distance",
            "elapsedTime",
            "simpleSteps",
            "walkSteps",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "reset": {
                "parameters": {},
                "description": "Resets the step counter, distance measure and time running.",
                "tests": []
            },
            "save": {
                "parameters": {},
                "description": "Saves the pedometer state to the phone. Permits permits accumulation of steps and distance between invocations of an App that uses the pedometer. Different Apps will have their own saved state.",
                "tests": []
            },
            "start": {
                "parameters": {},
                "description": "Starts the pedometer.",
                "tests": []
            },
            "stop": {
                "parameters": {},
                "description": "Stops the pedometer.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "simpleStep": {
                "parameters": {
                    "simpleSteps": "number",
                    "distance": "number"
                },
                "description": "This event is run when a raw step is detected."
            },
            "walkStep": {
                "parameters": {
                    "walkSteps": "number",
                    "distance": "number"
                },
                "description": "This event is run when a walking step is detected. A walking step is a step that appears to be involved in forward motion."
            }
        },
        "runTimeName": "Pedometer"
    },
    "proximitysensor": {
        "properties": {
            "available": {
                "description": "Reports whether or not the device has a proximity sensor.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "distance": {
                "description": "Returns the distance from the object to the device. The sensor must be enabled to return meaningful values.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "enabled": {
                "description": "If true, the sensor will generate events. Otherwise, no events are generated.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "keepRunningWhenOnPause": {
                "description": "Returns value of keepRunningWhenOnPause.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "maximumRange": {
                "description": "Determines a sensor's maximum range. Some proximity sensors return binary values that represent \"near\" or \"far.\" In this case, the sensor usually reports its maximum range value in the far state and a lesser value in the near state. Typically, the far value is a value > 5 cm, but this can vary from sensor to sensor.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "available",
            "distance",
            "maximumRange"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "available",
            "distance",
            "maximumRange",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "proximityChanged": {
                "parameters": {
                    "distance": "number"
                },
                "description": "Triggered when distance (in cm) of the object to the device changes."
            }
        },
        "runTimeName": "ProximitySensor"
    },
    "thermometer": {
        "properties": {
            "available": {
                "description": "Specifies whether or not the device has the hardware to support the Thermometer component.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "enabled": {
                "description": "Specifies whether the sensor should generate events. If true, the sensor will generate events. Otherwise, no events are generated.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "refreshTime": {
                "description": "The requested minimum time in milliseconds between changes in readings being reported. Android is not guaranteed to honor the request. Setting this property has no effect on pre-Gingerbread devices.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "temperature": {
                "description": "Returns the temperature in degrees Celsius. The sensor must be enabled and available to return meaningful values.",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "available",
            "temperature"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "available",
            "temperature",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "temperatureChanged": {
                "parameters": {
                    "temperature": "number"
                },
                "description": "Indicates a change of temperature, provided in degrees Celsius."
            }
        },
        "runTimeName": "Thermometer"
    },
    "contactpicker": {
        "properties": {
            "backgroundColor": {
                "description": "Specifies the ContactPicker's background color as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string. If an Image has been set, the color change will not be visible until the Image is removed.",
                "type": "color",
                "tests": [
                    "\"FF0aa8b1\""
                ]
            },
            "contactName": {
                "description": "Returns the full name of the selected contact, or the empty string if a name is unavailable.",
                "type": "string",
                "tests": [
                    `"Test contactName"`
                ]
            },
            "contactUri": {
                "description": "Returns a URI that specifies the location of the contact on the device.",
                "type": "string",
                "tests": [
                    `"Test contactUri"`
                ]
            },
            "emailAddress": {
                "description": "Returns the primary email address of the selected contact, or the empty string if an email address is unavailable.",
                "type": "string",
                "tests": [
                    `"Test emailAddress"`
                ]
            },
            "emailAddressList": {
                "description": "Returns a list of email addresses associated with the selected contact.",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "enabled": {
                "description": "Specifies whether the ContactPicker should be active and clickable.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontBold": {
                "description": "Specifies whether the text of the ContactPicker should be bold. Some fonts do not support bold.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontItalic": {
                "description": "Specifies whether the text of the ContactPicker should be italic. Some fonts do not support italic.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontSize": {
                "description": "Specifies the text font size of the ContactPicker, measured in sp(scale-independent pixels).",
                "type": "number",
                "tests": [
                    24
                ]
            },
            "fontTypeface": {
                "description": "Specifies the text font face of the ContactPicker as 'serif', 'sans serif', or 'monospace'.",
                "type": "string",
                "tests": [
                    `"monospace"`
                ]
            },
            "height": {
                "description": "Specifies the ContactPicker's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    180
                ]
            },
            "heightPercent": {
                "description": "Specifies the ContactPicker's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    25
                ]
            },
            "image": {
                "description": "Specifies the path of the ContactPicker's image. If there is both an Image and a BackgroundColor specified, only the Image will be visible.",
                "type": "string",
                "tests": [
                    `"cat.png"`
                ]
            },
            "phoneNumber": {
                "description": "Returns the primary phone number associated with the selected contact, or the empty string if no phone number is associated with the contact.",
                "type": "string",
                "tests": [
                    `"Test phoneNumber"`
                ]
            },
            "phoneNumberList": {
                "description": "Returns a list of phone numbers associated with the selected contact.",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "picture": {
                "description": "Returns a picture URI for the selected contact, which can be used to retrieve the contact's photo and other fields.",
                "type": "string",
                "tests": [
                    `"Test picture"`
                ]
            },
            "shape": {
                "description": "Specifies the shape of the ContactPicker. The valid values for this property are'round', 'rectangle' and 'oval'. The Shape will not be visible if an Image is used.",
                "type": "string",
                "tests": [
                    `"oval"`
                ]
            },
            "showFeedback": {
                "description": "Specifies if a visual feedback should be shown when a ContactPicker with an assigned Image is pressed.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "text": {
                "description": "Specifies the text displayed by the ContactPicker.",
                "type": "string",
                "tests": [
                    `"Test text"`
                ]
            },
            "textAlignment": {
                "description": "Specifies the alignment of the ContactPicker's text. Valid values are 'left', 'right' and 'center'.",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "textColor": {
                "description": "Specifies the text color of the ContactPicker as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string.",
                "type": "color",
                "tests": [
                    "\"FF890594\""
                ]
            },
            "visible": {
                "description": "Specifies whether the ContactPicker should be visible on the screen. Value is true{",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the ContactPicker, measured in pixels.",
                "type": "number",
                "tests": [
                    300
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the ContactPicker as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    85
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "contactName",
            "contactUri",
            "emailAddress",
            "emailAddressList",
            "height",
            "heightPercent",
            "phoneNumber",
            "phoneNumberList",
            "picture",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "fontTypeface",
            "heightPercent",
            "shape",
            "textAlignment",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "contactName",
            "contactUri",
            "emailAddress",
            "emailAddressList",
            "fontTypeface",
            "phoneNumber",
            "phoneNumberList",
            "picture",
            "shape",
            "textAlignment",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "open": {
                "parameters": {},
                "description": "Opens the ContactPicker, as though the user clicked on it.",
                "tests": []
            },
            "viewContact": {
                "parameters": {
                    "uri": "string"
                },
                "description": "Opens the selected contact's entry in the device's default Contacts app.",
                "tests": [
                    `"Test uri"`
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "afterPicking": {
                "parameters": {},
                "description": "Event to be raised after the ContactPicker activity returns its result and the properties have been filled in."
            },
            "beforePicking": {
                "parameters": {},
                "description": "Event to raise when the ContactPicker is clicked or the picker is shown using the Open method. This event occurs before the picker is displayed, and can be used to prepare the picker before it is shown."
            },
            "gotFocus": {
                "parameters": {},
                "description": "Indicates the cursor moved over the ContactPicker so it is now possible to click it."
            },
            "lostFocus": {
                "parameters": {},
                "description": "Indicates the cursor moved away from the ContactPicker so it is now no longer possible to click it."
            },
            "touchDown": {
                "parameters": {},
                "description": "Indicates that the ContactPicker was pressed down."
            },
            "touchUp": {
                "parameters": {},
                "description": "Indicates that the ContactPicker has been released."
            }
        },
        "runTimeName": "ContactPicker"
    },
    "emailpicker": {
        "properties": {
            "backgroundColor": {
                "description": "The background color of the `EmailPicker``. You can choose a color by name in the Designer or in the Blocks Editor. The default background color is 'default' (shaded 3-D look).",
                "type": "color",
                "tests": [
                    "\"FF5bf8a7\""
                ]
            },
            "enabled": {
                "description": "If set, user can enter text into the EmailPicker.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontBold": {
                "description": "Specifies whether the text of the EmailPicker should be bold. Some fonts do not support bold.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontItalic": {
                "description": "Specifies whether the text of the EmailPicker should be italic. Some fonts do not support italic.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontSize": {
                "description": "Specifies the text font size of the EmailPicker, measured in sp(scale-independent pixels).",
                "type": "number",
                "tests": [
                    0
                ]
            },
            "fontTypeface": {
                "description": "The text font face of the EmailPicker. Valid values are 'serif', 'sans serif', or 'monospace'.",
                "type": "string",
                "tests": [
                    `"monospace"`
                ]
            },
            "height": {
                "description": "Specifies the EmailPicker's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    120
                ]
            },
            "heightPercent": {
                "description": "Specifies the EmailPicker's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    25
                ]
            },
            "hint": {
                "description": "EmailPicker hint for the user.",
                "type": "string",
                "tests": [
                    `"Test hint"`
                ]
            },
            "text": {
                "description": "The text in the EmailPicker, which can be set by the programmer in the Designer or Blocks Editor, or it can be entered by the user (unless the Enabled property is false).",
                "type": "string",
                "tests": [
                    `"Test text"`
                ]
            },
            "textAlignment": {
                "description": "Specifies the alignment of the EmailPicker's text. Valid values are 'left', 'right' and 'center'.",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "textColor": {
                "description": "Specifies the text color of the EmailPicker as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string.",
                "type": "color",
                "tests": [
                    "\"FF08b94f\""
                ]
            },
            "visible": {
                "description": "Specifies whether the EmailPicker should be visible on the screen. Value is true{",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the EmailPicker, measured in pixels.",
                "type": "number",
                "tests": [
                    320
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the EmailPicker as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    83
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "height",
            "heightPercent",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "fontBold",
            "fontItalic",
            "fontTypeface",
            "heightPercent",
            "textAlignment",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "fontBold",
            "fontItalic",
            "fontTypeface",
            "textAlignment",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "requestFocus": {
                "parameters": {},
                "description": "Request focus to current EmailPicker.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "gotFocus": {
                "parameters": {},
                "description": "Event raised when the EmailPicker is selected for input, such as by the user touching it."
            },
            "lostFocus": {
                "parameters": {},
                "description": "Event raised when the EmailPicker is no longer selected for input, such as if the user touches a different text box."
            }
        },
        "runTimeName": "EmailPicker"
    },
    "phonecall": {
        "properties": {
            "phoneNumber": {
                "description": "Specifies the phone number to call.",
                "type": "string",
                "tests": [
                    `"0123456789"`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "makePhoneCall": {
                "parameters": {},
                "description": "Launches the default dialer app set to start a phone call using the number in the PhoneNumber property.",
                "tests": []
            },
            "makePhoneCallDirect": {
                "parameters": {},
                "description": "Directly initiates a phone call using the number in the PhoneNumber property, bypassing user interaction to start the call. Most apps should use MakePhoneCall instead, which requires no permissions.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "incomingCallAnswered": {
                "parameters": {
                    "phoneNumber": "string"
                },
                "description": "Event indicating that an incoming phone call is answered. phoneNumber is the incoming call phone number."
            },
            "phoneCallEnded": {
                "parameters": {
                    "status": "number",
                    "phoneNumber": "string"
                },
                "description": "Event indicating that a phone call has ended. The status can be any of: 1: Incoming call was missed or rejected 2: Incoming call was answered and hung up 3: Outgoing call was hung up."
            },
            "phoneCallStarted": {
                "parameters": {
                    "status": "number",
                    "phoneNumber": "string"
                },
                "description": "Event indicating that a phone call has started. The status can be any of: 1: Incoming call is ringing 2: Outgoing call is dialled"
            }
        },
        "runTimeName": "PhoneCall"
    },
    "phonenumberpicker": {
        "properties": {
            "backgroundColor": {
                "description": "Specifies the PhoneNumberPicker's background color as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string. If an Image has been set, the color change will not be visible until the Image is removed.",
                "type": "color",
                "tests": [
                    "\"FFc60133\""
                ]
            },
            "contactName": {
                "description": "Returns the full name of the selected contact, or the empty string if a name is unavailable.",
                "type": "string",
                "tests": [
                    `"Test contactName"`
                ]
            },
            "contactUri": {
                "description": "Returns a URI that specifies the location of the contact on the device.",
                "type": "string",
                "tests": [
                    `"Test contactUri"`
                ]
            },
            "emailAddress": {
                "description": "Returns the primary email address of the selected contact, or the empty string if an email address is unavailable.",
                "type": "string",
                "tests": [
                    `"Test emailAddress"`
                ]
            },
            "emailAddressList": {
                "description": "Returns a list of email addresses associated with the selected contact.",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "enabled": {
                "description": "Specifies whether the PhoneNumberPicker should be active and clickable.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontBold": {
                "description": "Specifies whether the text of the PhoneNumberPicker should be bold. Some fonts do not support bold.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontItalic": {
                "description": "Specifies whether the text of the PhoneNumberPicker should be italic. Some fonts do not support italic.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "fontSize": {
                "description": "Specifies the text font size of the PhoneNumberPicker, measured in sp(scale-independent pixels).",
                "type": "number",
                "tests": [
                    24
                ]
            },
            "fontTypeface": {
                "description": "Specifies the text font face of the PhoneNumberPicker as 'serif', 'sans serif', or 'monospace'.",
                "type": "string",
                "tests": [
                    `"monospace"`
                ]
            },
            "height": {
                "description": "Specifies the PhoneNumberPicker's vertical height, measured in pixels.",
                "type": "number",
                "tests": [
                    180
                ]
            },
            "heightPercent": {
                "description": "Specifies the PhoneNumberPicker's vertical height as a percentage of the Screen's Height.",
                "type": "number",
                "tests": [
                    45
                ]
            },
            "image": {
                "description": "Specifies the path of the PhoneNumberPicker's image. If there is both an Image and a BackgroundColor specified, only the Image will be visible.",
                "type": "string",
                "tests": [
                    `"cat.png"`
                ]
            },
            "phoneNumber": {
                "description": "Returns the primary phone number associated with the selected contact, or the empty string if no phone number is associated with the contact.",
                "type": "string",
                "tests": [
                    `"Test phoneNumber"`
                ]
            },
            "phoneNumberList": {
                "description": "Returns a list of phone numbers associated with the selected contact.",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "picture": {
                "description": "Returns a picture URI for the selected contact, which can be used to retrieve the contact's photo and other fields.",
                "type": "string",
                "tests": [
                    `"Test picture"`
                ]
            },
            "shape": {
                "description": "Specifies the shape of the PhoneNumberPicker. The valid values for this property are 'round', 'rectangle' and 'oval'. The Shape will not be visible if an Image is used.",
                "type": "string",
                "tests": [
                    `"oval"`
                ]
            },
            "showFeedback": {
                "description": "Specifies if a visual feedback should be shown when a PhoneNumberPicker with an assigned Image is pressed.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "text": {
                "description": "Specifies the text displayed by the PhoneNumberPicker.",
                "type": "string",
                "tests": [
                    `"Test text"`
                ]
            },
            "textAlignment": {
                "description": "Specifies the alignment of the PhoneNumberPicker's text. Valid values are 'left', 'right' and 'center'.",
                "type": "string",
                "tests": [
                    `"center"`
                ]
            },
            "textColor": {
                "description": "Specifies the text color of the PhoneNumberPicker as an red-green-blue-alpha RRGGBBAA or red-green-blue RRGGBB string.",
                "type": "color",
                "tests": [
                    "\"FF2abd44\""
                ]
            },
            "visible": {
                "description": "Specifies whether the PhoneNumberPicker should be visible on the screen. Value is true{",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "width": {
                "description": "Specifies the horizontal width of the PhoneNumberPicker, measured in pixels.",
                "type": "number",
                "tests": [
                    320
                ]
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the PhoneNumberPicker as a percentage of the Screen's Width.",
                "type": "number",
                "tests": [
                    85
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "contactName",
            "contactUri",
            "emailAddress",
            "emailAddressList",
            "height",
            "heightPercent",
            "phoneNumber",
            "phoneNumberList",
            "picture",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "fontTypeface",
            "heightPercent",
            "shape",
            "textAlignment",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "contactName",
            "contactUri",
            "emailAddress",
            "emailAddressList",
            "fontTypeface",
            "phoneNumber",
            "phoneNumberList",
            "picture",
            "shape",
            "textAlignment",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "open": {
                "parameters": {},
                "description": "Opens the PhoneNumberPicker, as though the user clicked on it.",
                "tests": []
            },
            "viewContact": {
                "parameters": {
                    "uri": "string"
                },
                "description": "Opens the selected contact's entry in the device's default Contacts app.",
                "tests": [
                    "Test uri"
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "afterPicking": {
                "parameters": {},
                "description": "Event to be raised after the PhoneNumberPicker activity returns its result and the properties have been filled in."
            },
            "beforePicking": {
                "parameters": {},
                "description": "Event to raise when the PhoneNumberPicker is clicked or the picker is shown using the Open method. This event occurs before the picker is displayed, and can be used to prepare the picker before it is shown."
            },
            "gotFocus": {
                "parameters": {},
                "description": "Indicates the cursor moved over the PhoneNumberPicker so it is now possible to click it."
            },
            "lostFocus": {
                "parameters": {},
                "description": "Indicates the cursor moved away from the PhoneNumberPicker so it is now no longer possible to click it."
            },
            "touchDown": {
                "parameters": {},
                "description": "Indicates that the PhoneNumberPicker was pressed down."
            },
            "touchUp": {
                "parameters": {},
                "description": "Indicates that the PhoneNumberPicker has been released."
            }
        },
        "runTimeName": "PhoneNumberPicker"
    },
    "sharing": {
        "properties": {
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "shareFile": {
                "parameters": {
                    "file": "string"
                },
                "description": "Shares a file through any capable application installed on the phone by displaying a list of the available apps and allowing the user to choose one from the list. The selected app will open with the file inserted on it.",
                "tests": [
                    `"Test file"`
                ]
            },
            "shareFileWithMessage": {
                "parameters": {
                    "file": "string",
                    "message": "string"
                },
                "description": "Shares both a file and a message through any capable application installed on the phone by displaying a list of available apps and allowing the user to choose one from the list. The selected app will open with the file and message inserted on it.",
                "tests": [
                    `"Test file"`,
                    `"Test message"`
                ]
            },
            "shareMessage": {
                "parameters": {
                    "message": "string"
                },
                "description": "Shares a message through any capable application installed on the phone by displaying a list of the available apps and allowing the user to choose one from the list. The selected app will open with the message inserted on it.",
                "tests": [
                    `"Test message"`
                ]
            }
        },
        "events": {},
        "runTimeName": "Sharing"
    },
    "texting": {
        "properties": {
            "googleVoiceEnabled": {
                "description": "If this property is true, then SendMessage will attempt to send messages over WiFi, using Google voice.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "message": {
                "description": "The message that will be sent when the SendMessage method is called. The maximum length of a standard SMS message is usually 170. It may be less for languages using diacritical marks.",
                "type": "string",
                "tests": [
                    `"Test message"`
                ]
            },
            "phoneNumber": {
                "description": "The number that the message will be sent to when the SendMessage method is called. The number is a text string with the specified digits (e.g., 6505551212). Dashes, dots, and parentheses may be included (e.g., (650)-555-1212) but will be ignored; spaces should not be included.",
                "type": "string",
                "tests": [
                    `""`
                ]
            },
            "receivingEnabled": {
                "description": "If set to 'off' no messages will be received. If set to 'foreground' or 'always' the component will respond to messages if it is running. In the case of 'foreground', messages received while the app is not running are discarded. In the case of 'always', messages receive while the app is not running will show a notification. Selecting the notification will bring up the app and signal the MessageReceived event. Messages received when the app is dormant will be queued, and so several MessageReceived events might appear when the app awakens. As an app developer, it would be a good idea to give your users control over this property, so they can make their phones ignore text messages when your app is installed.",
                "type": "string",
                "tests": [
                    `"foreground"`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "sendMessage": {
                "parameters": {},
                "description": "THIS DOESN'T WORK. IT'S A PERMISSIONS THING. SAME HAPPENS IN OFFICIAL APP INVENTOR BLOCKS. https://community.appinventor.mit.edu/t/error-908-permission-receive-sms/7426/5 Launch the phone's default text messaging app with the message and phone number prepopulated.",
                "tests": []
            },
            "sendMessageDirect": {
                "parameters": {},
                "description": "THIS DOESN'T WORK. IT'S A PERMISSIONS THING. SAME HAPPENS IN OFFICIAL APP INVENTOR BLOCKS. https://community.appinventor.mit.edu/t/error-908-permission-receive-sms/7426/5 Send a text message. Using this block will add dangerous permissions that will require additional approval if your app is submitted to the Google Play Store.",
                "tests": []
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "messageReceived": {
                "parameters": {
                    "number": "string",
                    "messageText": "string"
                },
                "description": "THIS DOESN'T WORK. IT'S A PERMISSIONS THING. SAME HAPPENS IN OFFICIAL APP INVENTOR BLOCKS. https://community.appinventor.mit.edu/t/error-908-permission-receive-sms/7426/5 Event that's raised when a text message is received by the phone. Using this block will add dangerous permissions that will require additional approval if your app is submitted to the Google Play Store."
            }
        },
        "runTimeName": "Texting"
    },
    "twitter": {
        "properties": {
            "consumerKey": {
                "description": "The consumer key to be used when authorizing with Twitter via OAuth.",
                "type": "string",
                "tests": [
                    `"Test consumerKey"`
                ]
            },
            "consumerSecret": {
                "description": "The consumer secret to be used when authorizing with Twitter via OAuth.",
                "type": "string",
                "tests": [
                    `"Test consumerSecret"`
                ]
            },
            "directMessages": {
                "description": "This property contains a list of the most recent messages mentioning the logged-in user. Initially, the list is empty. To set it, the program must",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "followers": {
                "description": "This property contains a list of the followers of the logged-in user. Initially, the list is empty. To set it, the program must",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "friendTimeline": {
                "description": "This property contains the 20 most recent messages of users being followed. Initially, the list is empty. To set it, the program must",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "mentions": {
                "description": "This property contains a list of mentions of the logged-in user. Initially, the list is empty. To set it, the program must",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "searchResults": {
                "description": "This property, which is initially empty, is set to a list of search results after the program",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "username": {
                "description": "The user name of the authorized user. Empty if there is no authorized user.",
                "type": "string",
                "tests": [
                    `"Test username"`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "directMessages",
            "followers",
            "friendTimeline",
            "mentions",
            "searchResults",
            "username"
        ],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "directMessages",
            "followers",
            "friendTimeline",
            "mentions",
            "searchResults",
            "username",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "authorize": {
                "parameters": {},
                "description": "Redirects user to login to Twitter via the Web browser using the OAuth protocol if we don't already have authorization.",
                "tests": []
            },
            "checkAuthorized": {
                "parameters": {},
                "description": "Check whether we already have access, and if so, causes the IsAuthorized event handler to be called.",
                "tests": []
            },
            "deAuthorize": {
                "parameters": {},
                "description": "Removes Twitter authorization from this running app instance.",
                "tests": []
            },
            "directMessage": {
                "parameters": {
                    "user": "string",
                    "message": "string"
                },
                "description": "This sends a direct (private) message to the specified user. The message will be trimmed if it exceeds 160 characters. Requirements: This should only be called after the IsAuthorized event has been raised, indicating that the user has successfully logged in to Twitter.",
                "tests": [
                    `"Test user"`,
                    `"Test message"`
                ]
            },
            "follow": {
                "parameters": {
                    "user": "string"
                },
                "description": "Starts following a user.",
                "tests": [
                    `"Test user"`
                ]
            },
            "requestDirectMessages": {
                "parameters": {},
                "description": "Requests the 20 most recent direct messages sent to the logged-in user. When the messages have been retrieved, the system will raise the DirectMessagesReceived event and set the DirectMessages property to the list of messages. Requirements: This should only be called after the IsAuthorized event has been raised, indicating that the user has successfully logged in to Twitter.",
                "tests": []
            },
            "requestFollowers": {
                "parameters": {},
                "description": "Gets who is following you.",
                "tests": []
            },
            "requestFriendTimeline": {
                "parameters": {},
                "description": "Gets the most recent 20 messages in the user's timeline.",
                "tests": []
            },
            "requestMentions": {
                "parameters": {},
                "description": "Requests the 20 most recent mentions of the logged-in user. When the mentions have been retrieved, the system will raise the MentionsReceived event and set the Mentions property to the list of mentions. Requirements: This should only be called after the IsAuthorized event has been raised, indicating that the user has successfully logged in to Twitter.",
                "tests": []
            },
            "searchTwitter": {
                "parameters": {
                    "query": "string"
                },
                "description": "This searches Twitter for the given String query. Requirements: This should only be called after the IsAuthorized event has been raised, indicating that the user has successfully logged in to Twitter.",
                "tests": [
                    `"Test query"`
                ]
            },
            "stopFollowing": {
                "parameters": {
                    "user": "string"
                },
                "description": "Stops following a user.",
                "tests": [
                    `"Test user"`
                ]
            },
            "tweet": {
                "parameters": {
                    "status": "string"
                },
                "description": "This sends a tweet as the logged-in user with the specified Text, which will be trimmed if it exceeds 160 characters. Requirements: This should only be called after the IsAuthorized event has been raised, indicating that the user has successfully logged in to Twitter.",
                "tests": [
                    `"Test status"`
                ]
            },
            "tweetWithImage": {
                "parameters": {
                    "status": "string",
                    "imagePath": "string"
                },
                "description": "This sends a tweet as the logged-in user with the specified Text and a path to the image to be uploaded, which will be trimmed if it exceeds 160 characters. If an image is not found or invalid, the update will not be sent. Requirements: This should only be called after the IsAuthorized event has been raised, indicating that the user has successfully logged in to Twitter.",
                "tests": [
                    `"Test status"`,
                    `"Test imagePath"`
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    `"Test eventName"`,
                    "callback"
                ]
            }
        },
        "events": {
            "directMessagesReceived": {
                "parameters": {
                    "messages": "list"
                },
                "description": "This event is raised when the recent messages requested through RequestDirectMessages have been retrieved. A list of the messages can then be found in the messages parameter or the DirectMessages property."
            },
            "followersReceived": {
                "parameters": {
                    "followers2": "list"
                },
                "description": "This event is raised when all of the followers of the logged-in user requested through RequestFollowers have been retrieved. A list of the followers can then be found in the followers parameter or the Followers property."
            },
            "friendTimelineReceived": {
                "parameters": {
                    "timeline": "list"
                },
                "description": "This event is raised when the messages requested through RequestFriendTimeline have been retrieved. The timeline parameter and the FriendTimeline property will contain a list of lists, where each sub-list contains a status update of the form (username message)."
            },
            "isAuthorized": {
                "parameters": {},
                "description": "This event is raised after the program calls Authorize if the authorization was successful. It is also called after a call to CheckAuthorized if we already have a valid access token. After this event has been raised, any other method for this component can be called."
            },
            "mentionsReceived": {
                "parameters": {
                    "mentions": "list"
                },
                "description": "This event is raised when the mentions of the logged-in user requested through RequestMentions have been retrieved. A list of the mentions can then be found in the mentions parameter or the Mentions property."
            },
            "searchSuccessful": {
                "parameters": {
                    "searchResults": "list"
                },
                "description": "This event is raised when the results of the search requested through SearchTwitter have been retrieved. A list of the results can then be found in the results parameter or the SearchResults property."
            }
        },
        "runTimeName": "Twitter"
    },
    "clouddb": {
        "properties": {
            "projectID": {
                "description": "Gets the ProjectID for this CloudDB project.",
                "type": "string",
                "tests": [
                    `"yailcode1"`
                ]
            },
            "redisPort": {
                "description": "The Redis Server port to use. Defaults to 6381",
                "type": "number",
                "tests": [
                    6381
                ]
            },
            "redisServer": {
                "description": "The Redis Server to use to store data. A setting of \"clouddb.appinventor.mit.edu\" means that the MIT server will be used.",
                "type": "string",
                "tests": [
                    `"clouddb.appinventor.mit.edu"`
                ]
            },
            "token": {
                "description": "This field contains the authentication token used to login to the backed Redis server. For the \"DEFAULT\" server, do not edit this value, the system will fill it in for you. A system administrator may also provide a special value to you which can be used to share data between multiple projects from multiple people. If using your own Redis server, set a password in the server's config and enter it here.",
                "type": "string",
                "tests": [
                    `"token"`
                ]
            },
            "useSSL": {
                "description": "Set to true to use SSL to talk to CloudDB/Redis server. This should be set to True for the \"DEFAULT\" server.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "token",
            "useSSL",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "token",
            "useSSL",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "appendValueToList": {
                "parameters": {
                    "tag": "string",
                    "itemToAdd": "any"
                },
                "description": "Append a value to the end of a list atomically. If two devices use this function simultaneously, both will be appended and no data lost.",
                "tests": [
                    `"Test tag"`,
                    `"any"`
                ]
            },
            "clearTag": {
                "parameters": {
                    "tag": "string"
                },
                "description": "Remove the tag from CloudDB.",
                "tests": [
                    `"Test tag"`
                ]
            },
            "cloudConnected": {
                "parameters": {},
                "description": "Returns true if we are on the network and will likely be able to connect to the CloudDB server.",
                "tests": []
            },
            "getTagList": {
                "parameters": {},
                "description": "Asks CloudDB to retrieve all the tags belonging to this project. The resulting list is returned in the event TagList.",
                "tests": []
            },
            "getValue": {
                "parameters": {
                    "tag": "string",
                    "valueIfTagNotThere": "any"
                },
                "description": "GetValue asks CloudDB to get the value stored under the given tag. It will pass the result to the GotValue will be given.",
                "tests": [
                    `"Test tag"`,
                    `"any"`
                ]
            },
            "removeFirstFromList": {
                "parameters": {
                    "tag": "string"
                },
                "description": "Obtain the first element of a list and atomically remove it. If two devices use this function simultaneously, one will get the first element and the the other will get the second element, or an error if there is no available element. When the element is available, the FirstRemoved event will be triggered.",
                "tests": [
                    `"Test tag"`
                ]
            },
            "storeValue": {
                "parameters": {
                    "tag": "string",
                    "valueToStore": "any"
                },
                "description": "Asks CloudDB to store the given value under the given tag.",
                "tests": [
                    `"Test tag"`,
                    `"any"`
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    `"Test eventName"`,
                    `"callback"`
                ]
            }
        },
        "events": {
            "cloudDBError": {
                "parameters": {
                    "message": "string"
                },
                "description": "Indicates that an error occurred while communicating with the CloudDB Redis server."
            },
            "dataChanged": {
                "parameters": {
                    "tag": "string",
                    "value": "any"
                },
                "description": "Indicates that the data in the CloudDB project has changed. Launches an event with the tag that has been updated and the value it now has."
            },
            "firstRemoved": {
                "parameters": {
                    "value": "any"
                },
                "description": "Event triggered by the RemoveFirstFromList function. The argument value is the object that was the first in the list, and which is now removed."
            },
            "gotValue": {
                "parameters": {
                    "tag": "string",
                    "value": "any"
                },
                "description": "Indicates that a GetValue request has succeeded."
            },
            "tagList": {
                "parameters": {
                    "value": "list"
                },
                "description": "Event triggered when we have received the list of known tags. Run in response to a call to the GetTagList function."
            },
            "updateDone": {
                "parameters": {
                    "tag": "string",
                    "operation": "string"
                },
                "description": "Indicates that operations that store data to CloudDB have completed."
            }
        },
        "runTimeName": "CloudDB"
    },
    "datafile": {
        "properties": {
            "columnNames": {
                "description": "Retrieve the column names of the currently loaded Source file. For CSV files, this will return a List of entries in the first row. For JSON files, this will return a List of keys in the JSON object.",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "columns": {
                "description": "Retrieve a List of columns of the currently loaded Source file.",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "defaultScope": {
                "description": "Specifies the default scope for files accessed using the File component. The App scope should work for most apps. Legacy mode can be used for apps that predate the newer constraints in Android on app file access.",
                "type": "string",
                "tests": [
                    `"App"`
                ]
            },
            "rows": {
                "description": "Retrieve a List of rows of the currently loaded Source file.",
                "type": "array",
                "tests": [
                    []
                ]
            },
            "sourceFile": {
                "description": "Sets the source file to parse data from, and then parses the file asynchronously. The results are stored in the Columns, Rows and ColumnNames properties. The expected formatting of the file is either the CSV or JSON format.",
                "type": "string",
                "tests": [
                    `"Test sourceFile"`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "columnNames",
            "columns",
            "rows"
        ],
        "codeNoRead": [
            "defaultScope",
            "sourceFile",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "columnNames",
            "columns",
            "defaultScope",
            "rows",
            "sourceFile",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "readFile": {
                "parameters": {
                    "fileName": "string"
                },
                "description": "Indicates source file to load data from. The expected format of the contents of the file are either CSV or JSON. Prefix the fileName with / to read from a specific file on the SD card (for example, /myFile.txt will read the file /sdcard/myFile.txt). To read assets packaged with an application (also works for the Companion) start the fileName with // (two slashes). If a fileName does not start with a slash, it will be read from the application's private storage (for packaged apps) and from /sdcard/AppInventor/data for the Companion.",
                "tests": [
                    `"Test fileName"`
                ]
            }
        },
        "events": {},
        "runTimeName": "DataFile"
    },
    "file": {
        "properties": {
            "defaultScope": {
                "description": "Specifies the default scope for files accessed using the File component. The App scope should work for most apps. Legacy mode can be used for apps that predate the newer constraints in Android on app file access.",
                "type": "string",
                "tests": [
                    `"App"`
                ]
            },
            "readPermission": {
                "description": "A designer-only property that can be used to enable read access to file storage outside of the app-specific directories.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "scope": {
                "description": "Indicates the current scope for operations such as ReadFrom and SaveFile.",
                "type": "string",
                "tests": [
                    `"App"`
                ]
            },
            "writePermission": {
                "description": "A designer-only property that can be used to enable write access to file storage outside of the app-specific directories.",
                "type": "boolean",
                "tests": [
                    true
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [
            "scope"
        ],
        "codeNoRead": [
            "defaultScope",
            "readPermission",
            "writePermission",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "defaultScope",
            "readPermission",
            "writePermission",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "appendToFile": {
                "parameters": {
                    "text": "string",
                    "fileName": "string"
                },
                "description": "Appends text to the end of a file. Creates the file if it does not already exist. See the help text under SaveFile for information about where files are written. On success, the AfterFileSaved event will run.",
                "tests": [
                    `"Test text"`,
                    `"Test fileName"`
                ]
            },
            "copyFile": {
                "parameters": {
                    "fromScope": "com.google.appinventor.components.common.FileScopeEnum",
                    "fromFileName": "string",
                    "toScope": "com.google.appinventor.components.common.FileScopeEnum",
                    "toFileName": "string"
                },
                "description": "Copy the contents from the first file to the second file.",
                "tests": [
                    `"App"`,
                    `"Test fromFileName"`,
                    `"App"`,
                    `"Test toFileName"`
                ]
            },
            "delete": {
                "parameters": {
                    "fileName": "string"
                },
                "description": "Deletes a file from storage. Prefix the fileName with / to delete a specific file in the SD card (for example, /myFile.txt will delete the file /sdcard/myFile.txt). If the fileName does not begin with a /, then the file located in the program's private storage will be deleted. Starting the fileName with // is an error because asset files cannot be deleted.",
                "tests": [
                    `"Test fileName"`
                ]
            },
            "exists": {
                "parameters": {
                    "scope": "com.google.appinventor.components.common.FileScopeEnum",
                    "path": "string"
                },
                "description": "Tests whether the path exists in the given scope.",
                "tests": [
                    `"App"`,
                    `"Test path"`
                ]
            },
            "isDirectory": {
                "parameters": {
                    "scope": "com.google.appinventor.components.common.FileScopeEnum",
                    "path": "string"
                },
                "description": "Tests whether the path named in the given scope is a directory.",
                "tests": [
                    `"App"`,
                    `"Test path"`
                ]
            },
            "listDirectory": {
                "parameters": {
                    "scope": "com.google.appinventor.components.common.FileScopeEnum",
                    "directoryName": "string"
                },
                "description": "Get a list of files and directories in the given directory.",
                "tests": [
                    `"App"`,
                    `"Test directoryName"`
                ]
            },
            "makeDirectory": {
                "parameters": {
                    "scope": "com.google.appinventor.components.common.FileScopeEnum",
                    "directoryName": "string"
                },
                "description": "Create a new directory for storing files. The semantics of this method are such that it will return true if the directory exists at its completion. This can mean that the directory already existed prior to the call.",
                "tests": [
                    `"App"`,
                    `"Test directoryName"`
                ]
            },
            "makeFullPath": {
                "parameters": {
                    "scope": "com.google.appinventor.components.common.FileScopeEnum",
                    "path": "string"
                },
                "description": "Converts the scope and path into a single string for other components.",
                "tests": [
                    `"App"`,
                    `"Test path"`
                ]
            },
            "moveFile": {
                "parameters": {
                    "fromScope": "com.google.appinventor.components.common.FileScopeEnum",
                    "fromFileName": "string",
                    "toScope": "com.google.appinventor.components.common.FileScopeEnum",
                    "toFileName": "string"
                },
                "description": "Move a file from one location to another.",
                "tests": [
                    `"App"`,
                    `"Test fromFileName"`,
                    `"App"`,
                    `"Test toFileName"`
                ]
            },
            "readFrom": {
                "parameters": {
                    "fileName": "string"
                },
                "description": "Reads text from a file in storage. Prefix the fileName with / to read from a specific file on the SD card (for example, /myFile.txt will read the file /sdcard/myFile.txt). To read assets packaged with an application (also works for the Companion) start the fileName with // (two slashes). If a fileName does not start with a slash, it will be read from the application's private storage (for packaged apps) and from /sdcard/AppInventor/data for the Companion.",
                "tests": [
                    `"Test fileName"`
                ]
            },
            "removeDirectory": {
                "parameters": {
                    "scope": "com.google.appinventor.components.common.FileScopeEnum",
                    "directoryName": "string",
                    "recursive": "boolean"
                },
                "description": "Remove a directory from the file system. If recursive is true, then everything is removed. If recursive is false, only the directory is removed and only if it is empty.",
                "tests": [
                    `"App"`,
                    `"Test directoryName"`,
                    true
                ]
            },
            "saveFile": {
                "parameters": {
                    "text": "string",
                    "fileName": "string"
                },
                "description": "Saves text to a file. If the fileName begins with a slash (/) the file is written to the sdcard (for example, writing to /myFile.txt will write the file to /sdcard/myFile.txt). If the fileName does not start with a slash, it will be written in the program's private data directory where it will not be accessible to other programs on the phone. There is a special exception for the AI Companion where these files are written to /sdcard/AppInventor/data to facilitate debugging. Note that this block will overwrite a file if it already exists. If you want to add content to an existing file use the AppendToFile method.",
                "tests": [
                    `"Test text"`,
                    `"Test fileName"`
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "afterFileSaved": {
                "parameters": {
                    "fileName": "string"
                },
                "description": "Event indicating that the contents of the file have been written."
            },
            "gotText": {
                "parameters": {
                    "text": "string"
                },
                "description": "Event indicating that the contents from the file have been read."
            }
        },
        "runTimeName": "File"
    },
    "spreadsheet": {
        "properties": {
            "applicationName": {
                "description": "The name of your application, used when making API calls.",
                "type": "string",
                "tests": [
                    `"Test applicationName"`
                ]
            },
            "credentialsJson": {
                "description": "The JSON File with credentials for the Service Account",
                "type": "string",
                "tests": [
                    `"Test credentialsJson"`
                ]
            },
            "spreadsheetID": {
                "description": "The ID for the Google Sheets file you want to edit. You can find the spreadsheetID in the URL of the Google Sheets file.",
                "type": "string",
                "tests": [
                    `"Test spreadsheetID"`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "applicationName",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "applicationName",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addCol": {
                "parameters": {
                    "sheetName": "string",
                    "data": "list"
                },
                "description": "Given a list of values as data, appends the values to the next empty column of the sheet. It will always start from the top row and continue downwards. Once complete, it triggers the FinishedAddCol callback event.",
                "tests": [
                    `"Test sheetName"`,
                    []
                ]
            },
            "addRow": {
                "parameters": {
                    "sheetName": "string",
                    "data": "list"
                },
                "description": "Given a list of values as data, appends the values to the next empty row of the sheet. It will always start from the left most column and continue to the right. Once complete, it triggers the FinishedAddRow callback event. Additionally, this returns the row number for the new row.",
                "tests": [
                    `"Test sheetName"`,
                    []
                ]
            },
            "clearRange": {
                "parameters": {
                    "sheetName": "string",
                    "rangeReference": "string"
                },
                "description": "Empties the cells in the given range. Once complete, this block triggers the FinishedClearRange callback event.",
                "tests": [
                    `"Test sheetName"`,
                    `"Test rangeReference"`
                ]
            },
            "getCellReference": {
                "parameters": {
                    "row": "number",
                    "col": "number"
                },
                "description": "Converts the integer representation of rows and columns to A1-Notation used in Google Sheets for a single cell. For example, row 1 and col 2 corresponds to the string \"B1\".",
                "tests": [
                    1,
                    1
                ]
            },
            "getRangeReference": {
                "parameters": {
                    "row1": "number",
                    "col1": "number",
                    "row2": "number",
                    "col2": "number"
                },
                "description": "Converts the integer representation of rows and columns for the corners of the range to A1-Notation used in Google Sheets. For example, selecting the range from row 1, col 2 to row 3, col 4 corresponds to the string \"B1:D3\".",
                "tests": [
                    1,
                    1,
                    2,
                    2
                ]
            },
            "readCell": {
                "parameters": {
                    "sheetName": "string",
                    "cellReference": "string"
                },
                "description": "On the page with the provided sheetName, reads the cell at the given cellReference and triggers the GotCellData callback event. The cellReference can be either a text block with A1-Notation, or the result of the getCellReference block.",
                "tests": [
                    `"Test sheetName"`,
                    `"A1"`
                ]
            },
            "readCol": {
                "parameters": {
                    "sheetName": "string",
                    "colNumber": "number"
                },
                "description": "On the page with the provided sheetName, reads the column at the given colNumber and triggers the GotColData callback event.",
                "tests": [
                    `"Test sheetName"`,
                    ``
                ]
            },
            "readRange": {
                "parameters": {
                    "sheetName": "string",
                    "rangeReference": "string"
                },
                "description": "On the page with the provided sheetName, reads the cells at the given rangeReference and triggers the GotRangeData callback event. The rangeReference can be either a text block with A1-Notation, or the result of the getRangeReference block.",
                "tests": [
                    `"Test sheetName"`,
                    `"Test rangeReference"`
                ]
            },
            "readRow": {
                "parameters": {
                    "sheetName": "string",
                    "rowNumber": "number"
                },
                "description": "On the page with the provided sheetName, reads the row at the given rowNumber and triggers the GotRowData callback event.",
                "tests": [
                    `"Test sheetName"`,
                    0
                ]
            },
            "readSheet": {
                "parameters": {
                    "sheetName": "string"
                },
                "description": "Reads the entire Google Sheets document and triggers the GotSheetData callback event.",
                "tests": [
                    `"Test sheetName"`
                ]
            },
            "readWithExactFilter": {
                "parameters": {
                    "sheetName": "string",
                    "colID": "number",
                    "value": "string"
                },
                "description": "Filters a Google Sheet for rows where the given column number matches the provided value.",
                "tests": [
                    `"Test sheetName"`,
                    0,
                    `"Test value"`
                ]
            },
            "readWithPartialFilter": {
                "parameters": {
                    "sheetName": "string",
                    "colID": "number",
                    "value": "string"
                },
                "description": "Filters a Google Sheet for rows where the given column number contains the provided value string.",
                "tests": [
                    `"Test sheetName"`,
                    0,
                    `"Test value"`
                ]
            },
            "removeCol": {
                "parameters": {
                    "sheetName": "string",
                    "colNumber": "number"
                },
                "description": "Deletes the column with the given column number from the table. This does not clear the column, but removes it entirely. The sheet's grid id can be found at the end of the url of the Google Sheets document, right after the \"gid=\". Once complete, it triggers the FinishedRemoveCol callback event.",
                "tests": [
                    `"Test sheetName"`,
                    0
                ]
            },
            "removeRow": {
                "parameters": {
                    "sheetName": "string",
                    "rowNumber": "number"
                },
                "description": "Deletes the row with the given row number (1-indexed) from the table. This does not clear the row, but removes it entirely. The sheet's grid id can be found at the end of the url of the Google Sheets document, right after the \"gid=\". Once complete, it triggers the FinishedRemoveRow callback event.",
                "tests": [
                    `"Test sheetName"`,
                    0
                ]
            },
            "writeCell": {
                "parameters": {
                    "sheetName": "string",
                    "cellReference": "string",
                    "data": "any"
                },
                "description": "Given text or a number as data, writes the value to the cell. It will override any existing data in the cell with the one provided. Once complete, it triggers the FinishedWriteCell callback event.",
                "tests": [
                    `"Test sheetName"`,
                    `"Test cellReference"`,
                    `"any"`
                ]
            },
            "writeCol": {
                "parameters": {
                    "sheetName": "string",
                    "colNumber": "number",
                    "data": "list"
                },
                "description": "Given a list of values as data, writes the values to the column with the given column number, overriding existing values from top down. (Note: It will not erase the entire column.) Once complete, it triggers the FinishedWriteCol callback event.",
                "tests": [
                    `"Test sheetName"`,
                    0,
                    []
                ]
            },
            "writeRange": {
                "parameters": {
                    "sheetName": "string",
                    "rangeReference": "string",
                    "data": "list"
                },
                "description": "Given list of lists as data, writes the values to cells in the range. The number of rows and columns in the range must match the dimensions of your data. This method will override existing data in the range. Once complete, it triggers the FinishedWriteRange callback event.",
                "tests": [
                    `"Test sheetName"`,
                    `"Test rangeReference"`,
                    []
                ]
            },
            "writeRow": {
                "parameters": {
                    "sheetName": "string",
                    "rowNumber": "number",
                    "data": "list"
                },
                "description": "Given a list of values as data, writes the values to the row with the given row number, overriding existing values from left to right. (Note: It will not erase the entire row.) Once complete, it triggers the FinishedWriteRow callback event.",
                "tests": [
                    `"Test sheetName"`,
                    0,
                    []
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "errorOccurred": {
                "parameters": {
                    "errorMessage": "string"
                },
                "description": "Triggered whenever an API call encounters an error. Details about the error are in errorMessage."
            },
            "finishedAddCol": {
                "parameters": {
                    "columnNumber": "number"
                },
                "description": "The callback event for the AddCol block, called once the values on the table have been updated. Additionally, this returns the column number for the new column."
            },
            "finishedAddRow": {
                "parameters": {
                    "rowNumber": "number"
                },
                "description": "The callback event for the AddRow block, called once the values on the table have been updated. Additionally, this returns the row number for the new row."
            },
            "finishedClearRange": {
                "parameters": {},
                "description": "The callback event for the ClearRange block, called once the values on the table have been updated."
            },
            "finishedRemoveCol": {
                "parameters": {},
                "description": "The callback event for the RemoveCol block, called once the values on the table have been updated."
            },
            "finishedRemoveRow": {
                "parameters": {},
                "description": "The callback event for the RemoveRow block, called once the values on the table have been updated."
            },
            "finishedWriteCell": {
                "parameters": {},
                "description": "The callback event for the WriteCell block, called once the values on the table have been updated."
            },
            "finishedWriteCol": {
                "parameters": {},
                "description": "The callback event for the WriteCol block, called once the values on the table have been updated."
            },
            "finishedWriteRange": {
                "parameters": {},
                "description": "The callback event for the WriteRange block, called once the values on the table have been updated."
            },
            "finishedWriteRow": {
                "parameters": {},
                "description": "The callback event for the WriteRow block, called once the values on the table have been updated."
            },
            "gotCellData": {
                "parameters": {
                    "cellData": "string"
                },
                "description": "The callback event for the ReadCell block. The cellData is the text value in the cell."
            },
            "gotColData": {
                "parameters": {
                    "colDataList": "list"
                },
                "description": "The callback event for the ReadCol block. The colDataList is a list of text cell-values in order of increasing row number."
            },
            "gotFilterResult": {
                "parameters": {
                    "return_rows": "list",
                    "return_data": "list"
                },
                "description": "The callbeck event for the ReadWithQuery block. The response is a list of rows, where each row satisfies the query."
            },
            "gotRangeData": {
                "parameters": {
                    "rangeData": "list"
                },
                "description": "The callback event for the ReadRange block. The rangeData is a list of rows, where the dimensions are the same as the rangeReference."
            },
            "gotRowData": {
                "parameters": {
                    "rowDataList": "list"
                },
                "description": "The callback event for the ReadRow block. The rowDataList is a list of text cell-values in order of increasing column number."
            },
            "gotSheetData": {
                "parameters": {
                    "sheetData": "list"
                },
                "description": "The callback event for the ReadSheet block. The sheetData is a list of rows."
            }
        },
        "runTimeName": "Spreadsheet"
    },
    "tinydb": {
        "properties": {
            "namespace": {
                "description": "Namespace for storing data.",
                "type": "string",
                "tests": [
                    `"Test namespace"`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "clearAll": {
                "parameters": {},
                "description": "Clear the entire data store.",
                "tests": []
            },
            "clearTag": {
                "parameters": {
                    "tag": "string"
                },
                "description": "Clear the entry with the given tag.",
                "tests": [
                    `"Test tag"`
                ]
            },
            "getTags": {
                "parameters": {},
                "description": "Return a list of all the tags in the data store.",
                "tests": []
            },
            "getValue": {
                "parameters": {
                    "tag": "string",
                    "valueIfTagNotThere": "any"
                },
                "description": "Retrieve the value stored under the given tag. If there's no such tag, then return valueIfTagNotThere.",
                "tests": [
                    `"Test tag"`,
                    `"any"`
                ]
            },
            "storeValue": {
                "parameters": {
                    "tag": "string",
                    "valueToStore": "any"
                },
                "description": "Store the given valueToStore under the given tag. The storage persists on the phone when the app is restarted.",
                "tests": [
                    `"Test tag"`,
                    `"any"`
                ]
            }
        },
        "events": {},
        "runTimeName": "TinyDB"
    },
    "tinywebdb": {
        "properties": {
            "serviceURL": {
                "description": "Specifies the URL of the Web service. The default value is the demo service running on App Engine.",
                "type": "string",
                "tests": [
                    `"http://tinywebdb.appinventor.mit.edu"`
                ]
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string",
                "tests": [
                    `"Test class"`
                ]
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string",
                "tests": [
                    `"Test id"`
                ]
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string",
                "tests": [
                    `"testComponent"`
                ]
            }
        },
        "designerNoWrite": [],
        "codeNoRead": [
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "class",
            "id",
            "name"
        ],
        "methods": {
            "getWebValue": {
                "parameters": {
                    "tag": "string"
                },
                "description": "GetValue asks the Web service to get the value stored under the given tag. It is up to the Web service what to return if there is no value stored under the tag. This component just accepts whatever is returned. The GotValue event will be run on completion.",
                "tests": [
                    `"Test tag"`
                ]
            },
            "storeWebValue": {
                "parameters": {
                    "tag": "string",
                    "valueToStore": "any"
                },
                "description": "Sends a request to the Web service to store the given valueToStore under the given tag. The ValueStored event will be run on completion.",
                "tests": [
                    `"Test tag"`,
                    `"any"`
                ]
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    `"Test eventName"`,
                    `"callback"`
                ]
            }
        },
        "events": {
            "gotValue": {
                "parameters": {
                    "tagFromWebDB": "string",
                    "valueFromWebDB": "any"
                },
                "description": "Indicates that a GetValue server request has succeeded."
            },
            "valueStored": {
                "parameters": {},
                "description": "Event indicating that a StoreValue server request has succeeded."
            },
            "webServiceError": {
                "parameters": {
                    "message": "string"
                },
                "description": "Indicates that the communication with the Web service signaled an error."
            }
        },
        "runTimeName": "TinyWebDB"
    },
    "chart": {
        "properties": {
            "backgroundColor": {
                "description": "Specifies the chart's background color as an alpha-red-green-blue integer.",
                "type": "color"
            },
            "description": {
                "description": "Specifies the text displayed by the description label inside the Chart. Specifying an empty string (\"\") will not display any label.",
                "type": "string"
            },
            "gridEnabled": {
                "description": "Changes the visibility of the Chart's grid, if the Chart Type is set to a Chart with an Axis (applies for Area, Bar, Line, Scatter Chart types).",
                "type": "boolean"
            },
            "height": {
                "description": "Specifies the Chart's vertical height, measured in pixels.",
                "type": "number"
            },
            "heightPercent": {
                "description": "Specifies the Chart's vertical height as a percentage of the Screen's Height.",
                "type": "number"
            },
            "labels": {
                "description": "Changes the Chart's X axis labels to the specified List, if the Chart's Type is set to a Chart with an Axis. The first entry of the List corresponds to the minimum x value of the data, the second to the min x value + 1, and so on. If a label is not specified for an x value, a default value is used (the x value of the axis tick at that location).",
                "type": "array"
            },
            "labelsFromString": {
                "description": "Specifies the labels to set to the Chart's X Axis, provided the current view is a Chart with an X Axis. The labels are specified as a single comma-separated values String (meaning each value is separated by a comma). See Chart.Labels for more details on how the Labels are applied to the Chart.",
                "type": "string"
            },
            "legendEnabled": {
                "description": "Changes the visibility of the Chart's Legend.",
                "type": "boolean"
            },
            "pieRadius": {
                "description": "Sets the Pie Radius of the Chart. If the current type is not the Pie Chart, the value has no effect.",
                "type": "number"
            },
            "type": {
                "description": "Specifies the type of the Chart, which determines how to visualize the data. Default is 'line', but you can set it to 'scatter', 'area', 'pie' or 'bar'.",
                "type": "string"
            },
            "visible": {
                "description": "Specifies whether the Chart should be visible on the screen.  Value is true if the Chart is showing and false if hidden.",
                "type": "boolean"
            },
            "width": {
                "description": "Specifies the horizontal width of the Chart, measured in pixels.",
                "type": "number"
            },
            "widthPercent": {
                "description": "Specifies the horizontal width of the Chart as a percentage of the Screen's Width.",
                "type": "number"
            },
            "XFromZero": {
                "description": "Determines whether the X axis origin is set at 0 or the minimum X value across all data series.",
                "type": "boolean"
            },
            "YFromZero": {
                "description": "Determines whether the Y axis origin is set at 0 or the minimum y value across all data series.",
                "type": "boolean"
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string"
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string"
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string"
            }
        },
        "designerNoWrite": [
            "height",
            "heightPercent",
            "labels",
            "width",
            "widthPercent"
        ],
        "codeNoRead": [
            "heightPercent",
            "labelsFromString",
            "pieRadius",
            "type",
            "widthPercent",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "labelsFromString",
            "pieRadius",
            "type",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "setDomain": {
                "parameters": {
                    "minimum": "number",
                    "maximum": "number"
                },
                "description": "Sets the minimum and maximum for the domain of the X axis."
            },
            "setRange": {
                "parameters": {
                    "minimum": "number",
                    "maximum": "number"
                },
                "description": "Sets the minimum and maximum for the range of the Y axis."
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "entryClick": {
                "parameters": {
                    "series": "component",
                    "x": "any",
                    "y": "number"
                },
                "description": "Indicates that the user clicked on a data entry in the Chart. The specific series, along with its x and y values, are reported."
            }
        },
        "runTimeName": "Chart"
    },
    "chartdata2d": {
        "properties": {
            "color": {
                "description": "Specifies the data series color as an alpha-red-green-blue integer.",
                "type": "color"
            },
            "colors": {
                "description": "Specifies the data series colors as a list of alpha-red-green-blue integers. If there is more data than there are colors, the colors will be alternated in order. E.g. if there are two colors Red and Blue, the colors will be applied in the order: Red, Blue, Red, Blue, ...",
                "type": "array"
            },
            "dataFileXColumn": {
                "description": "Value used when importing data from a DataFile component [Source](#ChartData2D.Source). The value represents the column to use from the DataFile for the x entries of the Data Series. For instance, if a column's first value is \"Time\", and a column value of \"Time\" is specified, that column will be used for the x values. If a value here is not specified, default values for the x values will be generated instead.",
                "type": "string"
            },
            "dataFileYColumn": {
                "description": "Value used when importing data from a DataFile component [Source](#ChartData2D.Source). The value represents the column to use from the DataFile for the y entries of the Data Series. For instance, if a column's first value is \"Temperature\", and a column value of \"Temperature\" is specified, that column will be used for the y values. If a value here is not specified, default values for the y values will be generated instead.",
                "type": "string"
            },
            "dataSourceKey": {
                "description": "Sets the Data Source key identifier for the value to import from the attached Data Source. An example is the tag of the TinyDB component, which identifies the value. The property is a Designer-only property, and should be changed after setting the Source component of the Chart Data component. A complete list of applicable values for each compatible source is as follows: * For TinyDB and CloudDB, this is the tag value. * For the AccelerometerSensor, the value should be one of the following: X Y or Z * For the GyroscopeSensor, the value should be one of the following: X Y or Z * For the LocationSensor, the value should be one of the following: latitude, longitude, altitude or speed * For the OrientationSensor, the value should be one of the following: pitch, azimuth or roll * For the Pedometer, the value should be one of the following:  WalkSteps, SimpleSteps or Distance * For the ProximitySensor, the value should be distance. * For the BluetoothClient, the value represents the prefix to remove from the value. For instance, if values come in the format \"t:12\", the prefix can be specified as \"t:\", and the prefix will then be removed from the data. No value can be specified if purely numerical values are returned.",
                "type": "string"
            },
            "elementsFromPairs": {
                "description": "Comma separated list of Elements to use for the data series. Values are formatted as follows: x1,y1,x2,y2,x3,y3. Values are taken in pairs, and an entry is formed from the x and y values.",
                "type": "string"
            },
            "label": {
                "description": "Specifies the text for the data series label.",
                "type": "string"
            },
            "lineType": {
                "description": "Changes the Line Type of the Data Series, provided that the Data component is attached to a Chart that has the type set to a line-based Chart(applies to area and line Chart types).  Valid types include linear, curved or stepped.",
                "type": "string"
            },
            "pointShape": {
                "description": "Changes the Point Shape of the Data Series, provided that the Data component is attached to a Chart that has the type set to the Scatter Chart. Valid types include circle, square, triangle, cross, x.",
                "type": "string"
            },
            "source": {
                "description": "Sets the Source to use for the Data component. Valid choices include AccelerometerSensor, BluetoothClient, CloudDB, DataFile, GyroscopeSensor, LocationSesnro, OrientationSensor, Pedometer, ProximitySensor TinyDB and Web components. The Source value also requires valid DataSourceValue, WebColumn or DataFileColumn properties, depending on the type of the Source attached (the required properties show up in the Properties menu after the Source is changed). If the data identified by the [DataSourceKey](#ChartData2D.DataSourceKey) is updated in the attached Data Source component, then the data is also updated in the Chart Data component.",
                "type": "string"
            },
            "spreadsheetUseHeaders": {
                "description": "If checked, the first row of the spreadsheet will be used to interpret the x and y column values. Otherwise, the x and y columns should be a column reference, such as A or B.",
                "type": "boolean"
            },
            "spreadsheetXColumn": {
                "description": "Sets the column to parse from the attached Spreadsheet component for the x values. If a column is not specified, default values for the x values will be generated instead.",
                "type": "string"
            },
            "spreadsheetYColumn": {
                "description": "Sets the column to parse from the attached Spreadsheet component for the y values. If a column is not specified, default values for the y values will be generated instead.",
                "type": "string"
            },
            "webXColumn": {
                "description": "Value used when importing data from a Web component Source. The value represents the column to use from the Web for the x entries of the Data Series. For instance, if the contents of the Web are retrieved in JSON format, and an array with the \"Time\" tag exists, the \"Time\" column value can be specified to use that array.",
                "type": "string"
            },
            "webYColumn": {
                "description": "Value used when importing data from a Web component Source. The value represents the column to use from the Web for the y entries of the Data Series. For instance, if the contents of the Web are retrieved in JSON format, and an array with the \"Temperature\" tag exists, the \"Temperature\" column value can be specified to use that array.",
                "type": "string"
            },
            "class": {
                "description": "The styling class of the the component",
                "type": "string"
            },
            "id": {
                "description": "The styling id of the the component",
                "type": "string"
            },
            "name": {
                "description": "The name of the component that will be used to refer to it in code.",
                "type": "string"
            }
        },
        "designerNoWrite": [
            "colors"
        ],
        "codeNoRead": [
            "dataFileXColumn",
            "dataFileYColumn",
            "dataSourceKey",
            "elementsFromPairs",
            "lineType",
            "pointShape",
            "source",
            "spreadsheetUseHeaders",
            "spreadsheetXColumn",
            "spreadsheetYColumn",
            "webXColumn",
            "webYColumn",
            "class",
            "id",
            "name"
        ],
        "codeNoWrite": [
            "dataFileXColumn",
            "dataFileYColumn",
            "dataSourceKey",
            "elementsFromPairs",
            "lineType",
            "pointShape",
            "source",
            "spreadsheetUseHeaders",
            "spreadsheetXColumn",
            "spreadsheetYColumn",
            "webXColumn",
            "webYColumn",
            "class",
            "id",
            "name"
        ],
        "methods": {
            "addEntry": {
                "parameters": {
                    "x": "string",
                    "y": "string"
                },
                "description": "Adds an entry with the specified x and y value. Values can be specified as text, or as numbers. For Line, Scatter, Area and Bar Charts, both values should represent a number. For Bar charts, the x value is rounded to the nearest integer. For Pie Charts, the x value is a text value."
            },
            "changeDataSource": {
                "parameters": {
                    "source": "component",
                    "keyValue": "string"
                },
                "description": "Changes the Data Source of the component to the specified component Source with the specified key value. See the ChartData2D.Source property for applicable components. See the ChartData2D.DataSourceKey property for the interpretation of the keyValue. In the case of the DataFile and Web components, the keyValue is expected to be a CSV formatted string, where the first value corresponds to the x column, and the second value corresponds to the y value."
            },
            "clear": {
                "parameters": {},
                "description": "Removes all the entries from the Data Series."
            },
            "doesEntryExist": {
                "parameters": {
                    "x": "string",
                    "y": "string"
                },
                "description": "Returns a boolean value specifying whether an entry with the specified x and y values exists. The boolean value of true is returned if the value exists, and a false value otherwise. See ChartData2D.AddEntry for an explanation of the valid entry values."
            },
            "getAllEntries": {
                "parameters": {},
                "description": "Returns all entries of the data series. The returned value is a list, where each element of the list is a list containing the values of the entry in order."
            },
            "getEntriesWithXValue": {
                "parameters": {
                    "x": "string"
                },
                "description": "Returns all entries of the data series matching the specified x value. For a description of the format of the returned List, see ChartData2D.GetAllEntries"
            },
            "getEntriesWithYValue": {
                "parameters": {
                    "y": "string"
                },
                "description": "Returns all entries of the data series matching the specified y value. For a description of the format of the returned List, see ChartData2D.GetAllEntries"
            },
            "importFromCloudDB": {
                "parameters": {
                    "cloudDB": "component",
                    "tag": "string"
                },
                "description": "Imports data from the specified CloudDB component by taking the value identified by the specified tag value. The expected CloudDB value is a list formatted in the same way as described in ChartData2D.ImportFromList. Does not overwrite any data."
            },
            "importFromDataFile": {
                "parameters": {
                    "dataFile": "component",
                    "xValueColumn": "string",
                    "yValueColumn": "string"
                },
                "description": "Imports data from the specified DataFile component by taking the specified x column for the x values, and the specified y column for the y values. The DataFile's source file is expected to be either a CSV or a JSON file.  Passing in empty test for any of the column parameters will result in the usage of default values which are the indices of the entries. For the first entry, the default value would be the 1, for the second it would be 2, and so on."
            },
            "importFromList": {
                "parameters": {
                    "list": "list"
                },
                "description": "Imports the data from the specified list parameter to the data series. The list is expected to contain element which are also lists. Each list element is expected to have 2 values, the first one being the x value, and the second one being the y value. Invalid list entries are simply skipped. Existing data are not cleared."
            },
            "importFromSpreadsheet": {
                "parameters": {
                    "spreadsheet": "component",
                    "xColumn": "string",
                    "yColumn": "string",
                    "useHeaders": "boolean"
                },
                "description": "Imports data from the specified Spreadsheet component by taking the specified x column for the x values, and the specified y column for the y values. Prior to calling this function, the Spreadsheet component's ReadSheet method has to be called to load the data. The usage of the GotSheet event in the Spreadsheet component is unnecessary. Empty columns are filled with default values (1, 2, 3, ... for Entry 1, 2, 3, ...)."
            },
            "importFromTinyDB": {
                "parameters": {
                    "tinyDB": "component",
                    "tag": "string"
                },
                "description": "Imports data from the specified TinyDB component by taking the value identified by the specified tag value. The expected TinyDB value is a list formatted in the same way as described in ChartData2D.ImportFromList. Does not overwrite any data."
            },
            "importFromWeb": {
                "parameters": {
                    "web": "component",
                    "xValueColumn": "string",
                    "yValueColumn": "string"
                },
                "description": "Imports data from the specified Web component by taking the specified x column for the x values, and the specified y column for the y values. Prior to calling this function, the Web component's Get method has to be called to load the data. The usage of the gotValue event in the Web component is unnecessary. The expected response of the Web component is a JSON or CSV formatted file for this function to work. Empty columns are filled with default values (1, 2, 3, ... for Entry 1, 2, 3, ...)."
            },
            "removeDataSource": {
                "parameters": {},
                "description": "Removes the currently attached Data Source from the Chart Data component. Doing so will result in no more updates from the Data Source being sent, however, the current data will not be removed."
            },
            "removeEntry": {
                "parameters": {
                    "x": "string",
                    "y": "string"
                },
                "description": "Removes an entry with the specified x and y value, provided it exists. See ChartData2D.AddEntry for an explanation of the valid entry values."
            },
            "addEventListener": {
                "description": "Method used to create event listeners.",
                "parameters": {
                    "eventName": "string",
                    "eventCallbackFunction": "callback"
                },
                "tests": [
                    "Test eventName",
                    "callback"
                ]
            }
        },
        "events": {
            "entryClick": {
                "parameters": {
                    "x": "any",
                    "y": "number"
                },
                "description": "Indicates that the user tapped on a data point in the chart. The x and y values of the tapped entry are reported."
            }
        },
        "runTimeName": "ChartData2D"
    }
}