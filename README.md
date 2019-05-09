# Sodalicium_Capstone

**Project Overview**

Retro Rabbits current claims process is slow and tedious, requiring the employee to keep all their slips until the first Friday of the month in order to make any claims. We have been tasked to help improve this claims process by creating an android application that will be used to scan either an odometer for fuel claims or a slip for other claims.

The image scanner will extract the relevant information from the scanned image, do the necessary calculations and store this information. Then on the first Friday of the month, the employee will simply send all their stored claims.

**Team Members**

Ryan Hartley u15016880 <br>
Baven Pavaday u15336728 <br>
Oluwatosin Botti u13208642 <br>
Tlou Lebelo u15209190 <br>


**How to run the OCR** 

Run npm install after downloading the file. <br>
**Navigate to the react-native-text-detector and change the build.gradle dependcies to the following:**

    implementation 'com.google.firebase:firebase-core:16.0.8'<br>
    implementation 'com.google.firebase:firebase-ml-vision:19.0.3'<br>
    implementation 'com.facebook.react:react-native:+'<br>
