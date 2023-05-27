Copyright and License:
www.makaney.net
Copyright (C) 2011 Makaney Code by Ziyad S. Al-Salloum <zss@zss.net>

Makaney Code is a non profit project, you are free to copy, publish, distribute, sublicense, and/or sell copies of Makaney Code, and to permit persons to whom Makaney Code is furnished to do so as long as in your application you refer to the code as "Makaney Code" or "MKC".

Q: What is Makaney Code?
Makaney code is a human-friendly alphanumeric representation (like postal or zip codes) of the geographic latitude and longitude coordinates. Using Makaney code helps easily identify places on earth with an easy to remember code. That's becomes very useful especially in countries that do not implement a practical postal code system. In such countries people tend to describe their locations using directions, which is not always straightforward, waste valuable time, and results in many inconveniences especially when an ambulance needs to reach a certain location as soon as possible.
Examples of Makaney Code Uses:

Addresses:
King Saud University, Admission Office     
Riyadh, Saudi Arabia
MKC: TLU5+MI2A

9th Floor, Apartment # 902    
Jeddah, Saudi Arabia
MKC: TASF+K7NP

Singing Sand Dunes    
Qatar,
MKC: TU6P+NKBD

El-tahrir Square    
Cairo, Egypt
MKC: CW7M+CE5M

University of Ibadan    
Ibadan, Nigeria,
MKC: OOML+BOYZ

Tristan Island Settlement,
Saint Helena
MKC: -KK36-2GH6

Social networks, verbal, or even handwritten communications:
Please, send a taxi to SUI8+4QPS, thanks.
We need an ambulance @ PWA8+8CLQ (Slums in India).
If you are on campus don't forget to grab a bite from the apple tree NKSU-PP7.
Please deliver to CMOK+CE95 apartment # 1, thank you.
Due to car accident the intersection @ OFCO+OO8U is currently blocked, will keep you updated.
Identify locations in places with many people, such as malls, concerts, football stadiums, or humanitarian camps.
Many other uses.
Q: How to read the Makaney Code?
The code can be divided into four parts, as described below:

Makaney Code Parts

where,
P1: The direction of the latitude. It can be either South (minus sign) or North (no sign).
P2: The latitude coordinate, which can range from one letter or number starting from A (i.e. 0) up to four alphanumeric letters (3BNY = 90.0000).
P3: The direction of the longitude, which can be East (plus sign) or West (minus sign).
P4: The longitude, which can range from one letter or number starting from A (i.e. 0) up to five alphanumeric letters (BFO7X = 180.0000).
Example:

Makaney Code

Q: How the direction is reflected in Makaney Code?
P1 and P3 are responsible of reflecting the direction of the coordinates in regard to the Equator and the Prime Meridian. They can be described as follows:

Makaney Code P1 sign

Makaney Code P3 sign

Examples:
Latitude, Longitude	Makaney Code
24.4973, 44.3860	THUN+MW9K
24.4973, -44.3860	THUN-MW9K
-24.4973, 44.3860	-THUN+MW9K
-24.4973,-44.3860	-THUN-MW9K
Q: What is the Makaney Code's Base33 alphabet?
The alphabets have been ordered to favour a more friendly choice of words in some areas that experience high population density and -- in the same time -- lacks a practical postal code system (such as pilgrimage areas). We exclude 0, 1, and V as they usually mistaken with O, I, and U, giving a more human friendly code.

Value	Symbol		Value	Symbol		Value	Symbol		Value	Symbol
0	A		9	J		18	D		27	5
1	B		10	K		19	9		28	L
2	O		11	W		20	8		29	7
3	2		12	M		21	4		30	6
4	Z		13	G		22	E		31	U
5	P		14	N		23	R		32	I
6	T		15	X		24	Y			
7	S		16	Q		25	3			
8	C		17	F		26	H			
Q: Why Base33 why not Base36 or Base64?
The idea is not to produce a short code only, but a code that is short and easy to read, write, speak, and remember. Base36 will be a bit confusing (i.e. 0 or O, I or 1) and Base64 is not human friendly.

Q: How to convert the Makaney Code to latitude and longitude?
Converting the Makaney Code to latitude and longitude is simple and straightforward. Let us take the following code as an example: THUN+MW9K

To get the latitude, we convert the second part (P2): THUN
Steps		Latitude/Longitude
Staring from zero, columns are numbered from right to left.	C 3	C 2	C 1	C 0	 
Split the Makaney Code so each symbol is in one column.	T	H	U	N	 
Look at the table and write the value that corresponds to the symbol.	6	26	31	14	 
Multiply each digit by 33 to the power of n, where n is the column number.	6 x (33^3)	26 x (33^2)	31 x (33^1)	14 x (33^0)	 
Put the answer in this row and add all the answers together.	215622	+ 28314	+ 1023	+ 14	= 244973
Divide the result by 10000	= 244973/10000	= 24.4973
To get the longitude -- using the same way -- we convert the fourth part (P4): MW9K
Steps		Latitude/Longitude
Staring from zero, columns are numbered from right to left.	C 3	C 2	C 1	C 0	 
Split the Makaney Code so each symbol is in one column.	M	W	9	K	 
Look at the table and write the value that corresponds with the symbol.	12	11	19	10	 
Multiply each digit by 33 to the power of n, where n is the column number.	12 x (33^3)	11 x (33^2)	19 x (33^1)	10 x (33^0)	 
Put the answer in this row and add all the answers together.	431244	+ 11979	+ 627	+ 10	= 443860
Divide the result by 10000	= 443860/10000	= 44.3860
Therefore,
Makaney Code	Latitude, Longitude
THUN+MW9K	24.4973, 44.3860
Mathematically the code can be converted using the following formula

Makaney Code Formula

Q: How to convert latitude and longitude to Makaney Code?

Two steps:
1) Multiply the geographic coordinate by 10000 then round it.

2) Divide the result by 33 and map the reminder to its corresponding symbol in the Makaney Code alphabets table.

Let us take this example: 24.4972618778735, 44.385991651520506
Latitude: round(24.4972618778735*10000) = 244973

Division	Quotient	Remainder	Remainder value to symbol mapping (from the Makaney Code alphabets table)
244973/33	7423	14	14 → N
7423/33	224	31	31 → U
224/33	6	26	26 → H
6/33	0	6	6 → T
Makaney Code (Latitude)	THUN
Longitude: round(44.385991651520506*10000) = 443860

Division	Quotient	Remainder	Remainder value to symbol mapping (from the Makaney Code alphabets table)
443860/33	13450	10	10 → K
13450/33	407	19	19 → 9
407/33	12	11	11 → W
12/33	0	12	12 → M
Makaney Code (Longitude)	MW9K
Therefore, the Makaney Code for 24.4972618778735, 44.385991651520506 is: THUN+MW9K

Below is a simple javascript that encode/decode the Makaney Code:



// www.makaney.net 
// Sept. 9 2011 version 0.2 (Beta)
// Copyright (C) 2011 Makaney Code by Ziyad S. Al-Salloum <zss@zss.net>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of Makaney Code, 
// to deal in Makaney Code without restriction, including without limitation the rights to use, 
// copy, publish, distribute, sublicense, and/or sell copies, and to permit persons
// to whom Makaney Code is furnished to do so, subject to the following condition:
//
// In your application you refer to the code as "Makaney Code" or "MKC"
//---------------------------------------------------------------------------------------
//
//
// Description (JavaScript):
// decimalToBase33(Math.round([latitude or longitude]*10000)) return Makaney Code of the coordinate.
// Example:
// Convert Latitude and longitude (24.4973, 44.38599999999997) to Makaney Code:
// 	decimalToBase33(Math.round(24.4973*10000)); // gives THUN
// 	decimalToBase33(Math.round(44.38599999999997*10000)); // gives MW9K 
// 	so Latitude and longitude (24.4973, 44.38599999999997) becomes THUN+MW9K
// Convert Makaney Code to Latitude and longitude:
//	makaneyToLatLon(Makaney Code) returns Latitude and longitude up to X digits.
//	makaneyToLatLon("THUN+MW9K") // gives 24.4973, 44.3860

var zbase33 = "abo2zptscjkwmgnxqfd984ery3h5l76ui";
var mbase = 33;

function base33ToDecimal (Str) {
	Sign = "";
	if (Str.charAt(0) == "-") {
		Sign = "-";
		Str = Str.substring(1);
	}
	else if (Str.charAt(0) == "+") Str = Str.substring(1);
	Str = Str.toLowerCase();
	var sum = 0;
	for (var i=0; i < Str.length; i++)
		sum += zbase33.indexOf(Str.charAt((Str.length - 1) - i)) * Math.pow(mbase, i);
	return Sign+sum;
}

function decimalToBase33 (N) {
	
	if (N == 0) {return "A"}
	X = Math.abs(N)
	var code = "";
	while (X > 0) {
		code = zbase33.charAt(X%mbase) + code;
		X = Math.floor(X/mbase);
	}
	return ((N<0) ? "-"+code : code);
}

function makaneyToLatLon (Str) {

	pos = Str.indexOf("+");
		
	if (pos != -1) lon = base33ToDecimal(Str.substring(pos))/10000;
	else {
		pos = Str.lastIndexOf("-");
		lon = base33ToDecimal(Str.substring(pos))/10000;
	}

	lat = base33ToDecimal(Str.substring(0, pos))/10000;
	
	return lat + "," + lon;
}
