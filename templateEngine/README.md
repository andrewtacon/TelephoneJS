Create a ... |Tag | Allowed Attributes | Allowed Attribute values
-|-|-|-
New Screen<br><i>This is the root node in the XML.<br>Only one per file as root element.</i>| screen | name | any text string
&nbsp;|&nbsp;|AppName|any text string
&nbsp;|&nbsp;|title|any text string
&nbsp;|&nbsp;|BackgroundImage|any text string that refers to an image file
&nbsp;|&nbsp;|ShowTitle|<b>false</b> removes the title, anything else keeps it in place
&nbsp;|&nbsp;|StatusBar|<b>false</b> removes status bar, anything else keeps it in place
Button|button|name|any text string
Text Label|label|name|any text string
Alert Box|notifier|name|any text string
Horizontal Layout <br><i>Items are stacked horizonatally<br>within this item</i>|hbox|name|any text string
&nbsp;|&nbsp;|halign|left, right, center
&nbsp;|&nbsp;|valign|top, center, bottom
&nbsp;|&nbsp;|width|parent (will fill parent container width)<br><i>integer</i>% (fill percentage of parent width)<br><i>integer</i> (have pixel width)
&nbsp;|&nbsp;|height|parent (will fill parent container height)<br><i>integer</i>% (fill percentage of parent height)<br><i>integer</i> (have pixel height)
&nbsp;|&nbsp;|backgroundColor|8 character hexadecimal value
&nbsp;|&nbsp;|image|any text string that refers to an image file
&nbsp;|&nbsp;|visible|<b>false</b> makes item invisible, anything else doesn't
Vertical Layout <br><i>Items are stacked Vertically<br>within this item</i>|vbox|&nbsp;|all parameters as for Horizontal Arrangement (hbox)
Horizontal Scroll Layout <br><i>Items are stacked horizontally<br>within this item with scrolling</i>|hscrollbox|&nbsp;|all parameters as for Horizontal Arrangement (hbox)
Vertical Scroll Layout <br><i>Items are stacked vertically<br>within this item with scrolling</i>|vscrollbox|&nbsp;|all parameters as for Horizontal Arrangement (hbox)
Table <br><i>Items are arranged in table format</i>|table|name|any text string
&nbsp;|&nbsp;|width|parent (will fill parent container width)<br><i>integer</i>% (fill percentage of parent width)<br><i>integer</i> (have pixel width)
&nbsp;|&nbsp;|height|parent (will fill parent container height)<br><i>integer</i>% (fill percentage of parent height)<br><i>integer</i> (have pixel height)
&nbsp;|&nbsp;|cols|integer - the number of columns. If omitted, default is 2.
&nbsp;|&nbsp;|rows|integer - the number of rows. If omitted, default is 2.
&nbsp;|&nbsp;|visible|<b>false</b> makes item invisible, anything else doesn't
Items in table cells need extra attributes.<br>If these are not provided then they<br>will be generated across rows and then down|&nbsp;|col|integer from 0 - column to place item in
&nbsp;|&nbsp;|row|integer from 0 - row to place item in