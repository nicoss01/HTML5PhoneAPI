HTML5 Phone JS API [![endorse](https://api.coderwall.com/nicoss01/endorsecount.png)](https://coderwall.com/nicoss01)
=============

A simple JS class to use HTML5 JS API Features for mobile

Functions
=========

console.log(String)
------------------
This function override the native js console to work on mobile.
**To show this console, just tap 3 times on the screen.**

phone.isMobile()
---------------
This function return true or false if your are on mobile device or not.

phone.orientation()
-------------------
This function return the orientation of screen (portrait/landscape)

phone.sms( PhoneNumber(String) , Content(String) ) 
--------------------------------------------------
This function open a new window to send an sms to the phone number in parameters.

phone.call( PhoneNumber(String) ) 
---------------------------------
This function open a new window to launch a phone call to the phone number in parameters.

phone.vibrate( parameters(Integer/Object) )
-------------------------------------------
this function launch vibrations on your phone.
Examples :

    phone.vibrate(1500);
The phone vibrate during 1500 milliseconds

    phone.vibrate([3000, 2000, 1000]);
Vibrate for three seconds, wait two seconds, then vibrate for one second

phone.battery()
---------------
This function return an Object that contains informations about battery :
 - charging (Boolean)
 - chargingTime (Integer in milliseconds)
 - dischargingTime (Integer in milliseconds)
 - level (Float between 0 and 1)

phone.test( FunctionName(String) )
----------------------------------
This function return true or false if the function name in parameters is supported by your device.

phone.notification( Title(String) , Message(String) )
-----------------------------------------------------
This function display notifications

phone.connection()
------------------
This function return an object that contains informations about connections (Wifi, Lan, Bluetooth)
