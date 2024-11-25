const admin = require('firebase-admin');
const fs = require('fs'); // File system module to write to a file
const crypto = require('crypto'); // For generating random passwords

const serviceAccount = require('./scubed-eda81-firebase-adminsdk-cr7u1-2090f590c5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Initialize Firestore database

const users = 
[
  {
    "userEmail": "rohanpatel2565@gmail.com",
    "displayName": "Rohan",
    "firstName": "Rohan",
    "lastName": "Patel",
    "center": "Bloomington",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Team Prapti",
    "tier": "All"
  },
  {
    "userEmail": "krishnmpatel02@gmail.com",
    "displayName": "Krishn",
    "firstName": "Krishn",
    "lastName": "Patel",
    "center": "Bloomington",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Reserve Officers' Training Corps (ROTC)",
    "tier": "All"
  },
  {
    "userEmail": "pateltej206@gmail.com",
    "displayName": "Tej",
    "firstName": "Tej",
    "lastName": "Patel",
    "center": "Bloomington",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Urmil's Umbrellas",
    "tier": "All"
  },
  {
    "userEmail": "batmanmonkey1244@gmail.com",
    "displayName": "Krish",
    "firstName": "Krish",
    "lastName": "Patel",
    "center": "Bloomington",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Keshav's Kachoris",
    "tier": "All"
  },
  {
    "userEmail": "prium111@gmail.com",
    "displayName": "Prium",
    "firstName": "Prium",
    "lastName": "Patel",
    "center": "Bloomington",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Big Bodies",
    "tier": "All"
  },
  {
    "userEmail": "adnakarani@gmail.com",
    "displayName": "Adi",
    "firstName": "Adi",
    "lastName": "Nakarani",
    "center": "Chicago",
    "role": "Kishore",
    "group": "Kishore",
    "team": "AP MW",
    "tier": "All"
  },
  {
    "userEmail": "brahmbhattshivam89@gmail.com",
    "displayName": "Shivam",
    "firstName": "Shivam",
    "lastName": "Brahmbhatt",
    "center": "Crystal Lake",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Urmil's Umbrellas",
    "tier": "All"
  },
  {
    "userEmail": "dev2008patel@icloud.com",
    "displayName": "Dev",
    "firstName": "Dev",
    "lastName": "Patel",
    "center": "Crystal Lake",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Epic Failures",
    "tier": "All"
  },
  {
    "userEmail": "Patelsidhant1@gmail.com",
    "displayName": "Sidhant",
    "firstName": "Sidhant",
    "lastName": "Patel",
    "center": "Detroit",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Dwij's Dweebs",
    "tier": "All"
  },
  {
    "userEmail": "kirtanpatel706@gmail.com",
    "displayName": "Kirtan",
    "firstName": "Kirtan",
    "lastName": "Patel",
    "center": "Detroit",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Skimmed",
    "tier": "All"
  },
  {
    "userEmail": "kirtanspatel74@gmail.com",
    "displayName": "Kirtan",
    "firstName": "Kirtan",
    "lastName": "Patel",
    "center": "Detroit",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Arpan's Archers",
    "tier": "All"
  },
  {
    "userEmail": "kunalpatel4202@gmail.com",
    "displayName": "Kunal",
    "firstName": "Kunal",
    "lastName": "Patel",
    "center": "Detroit",
    "role": "Kishore",
    "group": "Kishore",
    "team": "AP MW",
    "tier": "All"
  },
  {
    "userEmail": "theparampatel@gmail.com",
    "displayName": "Param",
    "firstName": "Param",
    "lastName": "Patel",
    "center": "Detroit",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Team Prapti",
    "tier": "All"
  },
  {
    "userEmail": "theompatel09@gmail.com",
    "displayName": "Om",
    "firstName": "Om",
    "lastName": "Patel",
    "center": "Detroit",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Team Prapti",
    "tier": "All"
  },
  {
    "userEmail": "54s.mpatel@gmail.com",
    "displayName": "Mihir",
    "firstName": "Mihir",
    "lastName": "Patel",
    "center": "Detroit",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Swami's Lions",
    "tier": "All"
  },
  {
    "userEmail": "Mitjpatel17@gmail.com",
    "displayName": "Mit",
    "firstName": "Mit",
    "lastName": "Patel",
    "center": "Detroit",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Flaming Pandas",
    "tier": "All"
  },
  {
    "userEmail": "theeklavyapatel@gmail.com",
    "displayName": "Eklavya",
    "firstName": "Eklavya",
    "lastName": "Patel",
    "center": "Detroit",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Keshav's Kachoris",
    "tier": "All"
  },
  {
    "userEmail": "Kishuanghan@gmail.com",
    "displayName": "krishiv",
    "firstName": "krishiv",
    "lastName": "Anghan",
    "center": "Detroit",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Young Yogis",
    "tier": "All"
  },
  {
    "userEmail": "Arpan4bapa@gmail.com",
    "displayName": "Arpan",
    "firstName": "Arpan",
    "lastName": "Patel",
    "center": "Detroit",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Arpan's Archers",
    "tier": "All"
  },
  {
    "userEmail": "tirthvaidhya@gmail.com",
    "displayName": "Tirth",
    "firstName": "Tirth",
    "lastName": "Vaidhya",
    "center": "Detroit",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Manit's Mohanthals",
    "tier": "All"
  },
  {
    "userEmail": "Tilak78690@gmail.com",
    "displayName": "Tilak",
    "firstName": "Tilak",
    "lastName": "Patel",
    "center": "Detroit",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Big Bodies",
    "tier": "All"
  },
  {
    "userEmail": "Mananrocks25@gmail.com",
    "displayName": "Manan",
    "firstName": "Manan",
    "lastName": "Patel",
    "center": "Detroit",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Adminstrator",
    "tier": "All"
  },
  {
    "userEmail": "patelmann12345@gmail.com",
    "displayName": "Mann",
    "firstName": "Mann",
    "lastName": "Patel",
    "center": "Evansville",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Skimmed",
    "tier": "All"
  },
  {
    "userEmail": "ansh12.patel21@gmail.com",
    "displayName": "ansh",
    "firstName": "ansh",
    "lastName": "patel",
    "center": "Evansville",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Reserve Officers' Training Corps (ROTC)",
    "tier": "All"
  },
  {
    "userEmail": "shubhjpatel42@gmail.com",
    "displayName": "Shubh",
    "firstName": "Shubh",
    "lastName": "Patel",
    "center": "Evansville",
    "role": "Kishore",
    "group": "Kishore",
    "team": "The Last Chairbenders",
    "tier": "All"
  },
  {
    "userEmail": "patelhet678@gmail.com",
    "displayName": "Het",
    "firstName": "Het",
    "lastName": "patel",
    "center": "Evansville",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Epic Failures",
    "tier": "All"
  },
  {
    "userEmail": "pdivy0427@gmail.com",
    "displayName": "Divy",
    "firstName": "Divy",
    "lastName": "Patel",
    "center": "Evansville",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Keshav's Kachoris",
    "tier": "All"
  },
  {
    "userEmail": "yugpatel0408@gmail.com",
    "displayName": "Yug",
    "firstName": "Yug",
    "lastName": "Patel",
    "center": "Evansville",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Urmil's Umbrellas",
    "tier": "All"
  },
  {
    "userEmail": "Ishan12282001@gmail.com",
    "displayName": "Ishan",
    "firstName": "Ishan",
    "lastName": "Patel",
    "center": "Evansville",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Young Yogis",
    "tier": "All"
  },
  {
    "userEmail": "Sanatpatel405@gmail.com",
    "displayName": "Sanat",
    "firstName": "Sanat",
    "lastName": "patel",
    "center": "Evansville",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Dev’s D Line",
    "tier": "All"
  },
  {
    "userEmail": "jaipatel2108@gmail.com",
    "displayName": "Jai",
    "firstName": "Jai",
    "lastName": "Patel",
    "center": "Evansville",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Epic Failures",
    "tier": "All"
  },
  {
    "userEmail": "himupatel108@gmail.com",
    "displayName": "Himanshu",
    "firstName": "Himanshu",
    "lastName": "Patel",
    "center": "evansville",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Meets Meet Neels",
    "tier": "All"
  },
  {
    "userEmail": "davejpatel42@gmail.com",
    "displayName": "Dave",
    "firstName": "Dave",
    "lastName": "Patel",
    "center": "Evansville, IN",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Big Bodies",
    "tier": "All"
  },
  {
    "userEmail": "pateldevp8233@gmail.com",
    "displayName": "Dev",
    "firstName": "Dev",
    "lastName": "Patel",
    "center": "Indiana",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Reserve Officers' Training Corps (ROTC)",
    "tier": "All"
  },
  {
    "userEmail": "Keshavpatel1227@gmail.com",
    "displayName": "Keshav",
    "firstName": "Keshav",
    "lastName": "Patel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Keshav's Kachoris",
    "tier": "All"
  },
  {
    "userEmail": "ppujan787@gmail.com",
    "displayName": "Pujan",
    "firstName": "Pujan",
    "lastName": "Patel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Epic Failures",
    "tier": "All"
  },
  {
    "userEmail": "kirtanpatel2022@gmail.com",
    "displayName": "Kirtan",
    "firstName": "Kirtan",
    "lastName": "Patel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Dev’s D Line",
    "tier": "All"
  },
  {
    "userEmail": "pratik81005@gmail.com",
    "displayName": "pratik",
    "firstName": "pratik",
    "lastName": "patel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Urmil's Umbrellas",
    "tier": "All"
  },
  {
    "userEmail": "24krishpatel@gmail.com",
    "displayName": "Krish",
    "firstName": "Krish",
    "lastName": "Patel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Epic Failures",
    "tier": "All"
  },
  {
    "userEmail": "Dwijkanani@gmail.com",
    "displayName": "Dwij",
    "firstName": "Dwij",
    "lastName": "Kanani",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Dwij's Dweebs",
    "tier": "All"
  },
  {
    "userEmail": "mmalviya582@gmail.com",
    "displayName": "Manav",
    "firstName": "Manav",
    "lastName": "Malviya",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Meets Meet Neels",
    "tier": "All"
  },
  {
    "userEmail": "parthivpatel46143@gmail.com",
    "displayName": "Parthiv",
    "firstName": "Parthiv",
    "lastName": "Patel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Flaming Pandas",
    "tier": "All"
  },
  {
    "userEmail": "neerratanpara@gmail.com",
    "displayName": "Neer",
    "firstName": "Neer",
    "lastName": "Ratanpara",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Skimmed",
    "tier": "All"
  },
  {
    "userEmail": "akhand.patel@gmail.com",
    "displayName": "Akhand",
    "firstName": "Akhand",
    "lastName": "Patel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Dwij's Dweebs",
    "tier": "All"
  },
  {
    "userEmail": "darshanmehta2134@gmail.com",
    "displayName": "Darshan",
    "firstName": "Darshan",
    "lastName": "Mehta",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Swami's Lions",
    "tier": "All"
  },
  {
    "userEmail": "12milappatel2006@gmail.com",
    "displayName": "Milap",
    "firstName": "Milap",
    "lastName": "Patel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "The Last Chairbenders",
    "tier": "All"
  },
  {
    "userEmail": "devpatel745@gmail.com",
    "displayName": "Dev",
    "firstName": "Dev",
    "lastName": "Patel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Dev’s D Line",
    "tier": "All"
  },
  {
    "userEmail": "nishadpatel1806@gmail.com",
    "displayName": "Nishad",
    "firstName": "Nishad",
    "lastName": "Patel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Young Yogis",
    "tier": "All"
  },
  {
    "userEmail": "mpatel031329@gmail.com",
    "displayName": "Meet",
    "firstName": "Meet",
    "lastName": "Patel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Meets Meet Neels",
    "tier": "All"
  },
  {
    "userEmail": "Keyurpanchal1208@gmail.com",
    "displayName": "Keyur",
    "firstName": "Keyur",
    "lastName": "Panchal",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Dev's D Line",
    "tier": "All"
  },
  {
    "userEmail": "amin.dwarkesh@gmail.com",
    "displayName": "Dwarkesh",
    "firstName": "Dwarkesh",
    "lastName": "Amin",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Meets Meet Neels",
    "tier": "All"
  },
  {
    "userEmail": "Yashpatel062010@icloud.com",
    "displayName": "Yash",
    "firstName": "Yash",
    "lastName": "Patel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Team Prapti",
    "tier": "All"
  },
  {
    "userEmail": "Pateljai232@gmail.com",
    "displayName": "Jai",
    "firstName": "Jai",
    "lastName": "Patel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Team Prapti",
    "tier": "All"
  },
  {
    "userEmail": "Jainish.jhs@gmail.com",
    "displayName": "Jainish",
    "firstName": "Jainish",
    "lastName": "Shingala",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Mukhpath Sharp Shooters",
    "tier": "All"
  },
  {
    "userEmail": "pdarshan494@gmail.com",
    "displayName": "Darshan",
    "firstName": "Darshan",
    "lastName": "patel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Keshav's Kachoris",
    "tier": "All"
  },
  {
    "userEmail": "pahal.kapatel@gmail.com",
    "displayName": "Pahal",
    "firstName": "Pahal",
    "lastName": "Kapatel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "The Last Chairbenders",
    "tier": "All"
  },
  {
    "userEmail": "Namrapatel0617@gmail.com",
    "displayName": "Namra",
    "firstName": "Namra",
    "lastName": "Patel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Big Bodies",
    "tier": "All"
  },
  {
    "userEmail": "spatel092010@gmail.com",
    "displayName": "Sharad",
    "firstName": "Sharad",
    "lastName": "Patel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Manit's Mohanthals",
    "tier": "All"
  },
  {
    "userEmail": "Kspkrutik@gmail.com",
    "displayName": "Krutik",
    "firstName": "Krutik",
    "lastName": "Panchal",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Big Bodies",
    "tier": "All"
  },
  {
    "userEmail": "preetpatel0912@gmail.com",
    "displayName": "Preet",
    "firstName": "Preet",
    "lastName": "Patel",
    "center": "Indianapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Swami's Lions",
    "tier": "All"
  },
  {
    "userEmail": "Aksharmodi09@gmail.com",
    "displayName": "Akshar",
    "firstName": "Akshar",
    "lastName": "modi",
    "center": "Kansas City",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Manit's Mohanthals",
    "tier": "All"
  },
  {
    "userEmail": "lavpat2008@gmail.com",
    "displayName": "Lav",
    "firstName": "Lav",
    "lastName": "Patel",
    "center": "Kansas City",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Big Bodies",
    "tier": "All"
  },
  {
    "userEmail": "paramrpatel2009@gmail.com",
    "displayName": "Param",
    "firstName": "Param",
    "lastName": "Patel",
    "center": "Kansas City",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Dwij's Dweebs",
    "tier": "All"
  },
  {
    "userEmail": "dhruv716patel@gmail.com",
    "displayName": "Dhruv",
    "firstName": "Dhruv",
    "lastName": "Patel",
    "center": "Kansas City",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Swami's Lions",
    "tier": "All"
  },
  {
    "userEmail": "Rushi9164@gmail.com",
    "displayName": "Rushi",
    "firstName": "Rushi",
    "lastName": "patel",
    "center": "Kansas City",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Skimmed",
    "tier": "All"
  },
  {
    "userEmail": "12superd@gmail.com",
    "displayName": "Dhruv",
    "firstName": "Dhruv",
    "lastName": "Shukla",
    "center": "Kansas City",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Mukhpath Sharp Shooters",
    "tier": "All"
  },
  {
    "userEmail": "Kbtalati08@gmail.com",
    "displayName": "Krish",
    "firstName": "Krish",
    "lastName": "Talatj",
    "center": "Kansas City",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Flaming Pandas",
    "tier": "All"
  },
  {
    "userEmail": "Ishanpatelks@gmail.com",
    "displayName": "Ishan",
    "firstName": "Ishan",
    "lastName": "Patel",
    "center": "Kansas City",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Swami's Lions",
    "tier": "All"
  },
  {
    "userEmail": "Shubhrpatel314@gmail.com",
    "displayName": "Shubh",
    "firstName": "Shubh",
    "lastName": "Patel",
    "center": "Kansas City",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Flaming Pandas",
    "tier": "All"
  },
  {
    "userEmail": "anshpatel0716@gmail.com",
    "displayName": "Ansh",
    "firstName": "Ansh",
    "lastName": "Patel",
    "center": "Kansas City",
    "role": "Kishore",
    "group": "Kishore",
    "team": "AP MW",
    "tier": "All"
  },
  {
    "userEmail": "Sunpatel879@gmail.com",
    "displayName": "Sun",
    "firstName": "Sun",
    "lastName": "Patel",
    "center": "Kansas City",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Mukhpath Sharp Shooters",
    "tier": "All"
  },
  {
    "userEmail": "rushipatel314@gmail.com",
    "displayName": "Rushi",
    "firstName": "Rushi",
    "lastName": "Patel",
    "center": "Kansas City",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Adminsitrator",
    "tier": "All"
  },
  {
    "userEmail": "Krrishpatel6472@gmail.com",
    "displayName": "Krrish",
    "firstName": "Krrish",
    "lastName": "Patel",
    "center": "Milwaukee",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Manit's Mohanthals",
    "tier": "All"
  },
  {
    "userEmail": "Yogipatel2003@gmail.com",
    "displayName": "Yogi",
    "firstName": "Yogi",
    "lastName": "Patel",
    "center": "Milwaukee",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Young Yogis",
    "tier": "All"
  },
  {
    "userEmail": "mayurbrahmbhatt95@gmail.com",
    "displayName": "Mayur",
    "firstName": "Mayur",
    "lastName": "Brahmbhatt",
    "center": "Milwaukee",
    "role": "Kishore",
    "group": "Kishore",
    "team": "The Last Chairbenders",
    "tier": "All"
  },
  {
    "userEmail": "dhirupatel248@gmail.com",
    "displayName": "Dhir",
    "firstName": "Dhir",
    "lastName": "Patel",
    "center": "Milwaukee",
    "role": "Kishore",
    "group": "Kishore",
    "team": "AP MW",
    "tier": "All"
  },
  {
    "userEmail": "sanp7542@gmail.com",
    "displayName": "Sanchit",
    "firstName": "Sanchit",
    "lastName": "Patil",
    "center": "Milwaukee",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Young Yogis",
    "tier": "All"
  },
  {
    "userEmail": "swagatbrahmbhatt28@gmail.com",
    "displayName": "Swagat",
    "firstName": "Swagat",
    "lastName": "Brahmbhatt",
    "center": "Milwaukee",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Arpan's Archers",
    "tier": "All"
  },
  {
    "userEmail": "Spatel200611@gmail.om",
    "displayName": "Shreeji",
    "firstName": "Shreeji",
    "lastName": "Patel",
    "center": "Milwaukee",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Mukhpath Sharp Shooters",
    "tier": "All"
  },
  {
    "userEmail": "sammypk218@gmail.com",
    "displayName": "Pratham",
    "firstName": "Pratham",
    "lastName": "Kachhadia",
    "center": "Minneapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "The Last Chairbenders",
    "tier": "All"
  },
  {
    "userEmail": "parth1bhakta@gmail.com",
    "displayName": "Parth",
    "firstName": "Parth",
    "lastName": "Bhakta",
    "center": "Minneapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Adminsitrator",
    "tier": "All"
  },
  {
    "userEmail": "krishnajpatel02@gmail.com",
    "displayName": "Krishna",
    "firstName": "Krishna",
    "lastName": "Patel",
    "center": "Minneapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Mukhpath Sharp Shooters",
    "tier": "All"
  },
  {
    "userEmail": "parthdes11@gmail.com",
    "displayName": "Parth",
    "firstName": "Parth",
    "lastName": "Desai",
    "center": "Minneapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Mukhpath Sharp Shooters",
    "tier": "All"
  },
  {
    "userEmail": "Jay.kansara@icloud.com",
    "displayName": "Jay",
    "firstName": "Jay",
    "lastName": "Kansara",
    "center": "Minneapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Young Yogis",
    "tier": "All"
  },
  {
    "userEmail": "Jayrpatel5055@gmail.com",
    "displayName": "Jay",
    "firstName": "Jay",
    "lastName": "Patel",
    "center": "Minneapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Dwij's Dweebs",
    "tier": "All"
  },
  {
    "userEmail": "Manitpatel21@gmail.com",
    "displayName": "Manit",
    "firstName": "Manit",
    "lastName": "Patel",
    "center": "Minneapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Manit's Mohanthals",
    "tier": "All"
  },
  {
    "userEmail": "darshiv5570@gmail.com",
    "displayName": "Darshiv",
    "firstName": "Darshiv",
    "lastName": "Pandit",
    "center": "Minneapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "The Last Chairbenders",
    "tier": "All"
  },
  {
    "userEmail": "Shiven.patel915@gmail.com",
    "displayName": "Shiven",
    "firstName": "Shiven",
    "lastName": "Patel",
    "center": "Minneapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "AP MW",
    "tier": "All"
  },
  {
    "userEmail": "Neeldave3004@gmail.com",
    "displayName": "Neel",
    "firstName": "Neel",
    "lastName": "dave",
    "center": "Minneapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Meets Meet Neels",
    "tier": "All"
  },
  {
    "userEmail": "shivam.patel1835@gmail.com",
    "displayName": "Shivam",
    "firstName": "Shivam",
    "lastName": "Patel",
    "center": "Minneapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Arpan's Archers",
    "tier": "All"
  },
  {
    "userEmail": "Pancholi.aarav@gmail.com",
    "displayName": "Aarav",
    "firstName": "Aarav",
    "lastName": "Pancholi",
    "center": "Minneapolis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Skimmed",
    "tier": "All"
  },
  {
    "userEmail": "nealpatel1215@gmail.com",
    "displayName": "Neal",
    "firstName": "Neal",
    "lastName": "Patel",
    "center": "Munster",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Keshav's Kachoris",
    "tier": "All"
  },
  {
    "userEmail": "neelp2023@gmail.com",
    "displayName": "Neel",
    "firstName": "Neel",
    "lastName": "Patel",
    "center": "Munster",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Meets Meet Neels",
    "tier": "All"
  },
  {
    "userEmail": "pratham4569@gmail.com",
    "displayName": "Pratham",
    "firstName": "Pratham",
    "lastName": "Patel",
    "center": "Munster",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Dwij's Dweebs",
    "tier": "All"
  },
  {
    "userEmail": "r.patel.12.2004@gmail.com",
    "displayName": "Rushi",
    "firstName": "Rushi",
    "lastName": "Patel",
    "center": "Munster",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Urmil's Umbrellas",
    "tier": "All"
  },
  {
    "userEmail": "rushijackson@gmail.com",
    "displayName": "Rushi",
    "firstName": "Rushi",
    "lastName": "Patel",
    "center": "Munster",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Reserve Officers' Training Corps (ROTC)",
    "tier": "All"
  },
  {
    "userEmail": "shrey1212@icloud.com",
    "displayName": "Shrey",
    "firstName": "Shrey",
    "lastName": "Patel",
    "center": "Munster",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Skimmed",
    "tier": "All"
  },
  {
    "userEmail": "Ishaanpatel135@gmail.com",
    "displayName": "Ishaan",
    "firstName": "Ishaan",
    "lastName": "Patel",
    "center": "Munster",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Reserve Officers' Training Corps (ROTC)",
    "tier": "All"
  },
  {
    "userEmail": "Nisarg20p@gmail.com",
    "displayName": "Nisarg",
    "firstName": "Nisarg",
    "lastName": "Patel",
    "center": "Munster",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Dev's D Line",
    "tier": "All"
  },
  {
    "userEmail": "Patelma220@gmail.com",
    "displayName": "Meet",
    "firstName": "Meet",
    "lastName": "Patel",
    "center": "Munster",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Meets Meet Neels",
    "tier": "All"
  },
  {
    "userEmail": "Jainilpatel080@gmail.com",
    "displayName": "Jainil",
    "firstName": "Jainil",
    "lastName": "patel",
    "center": "Munster",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Dwij's Dweebs",
    "tier": "All"
  },
  {
    "userEmail": "sheta.rushank@gmail.com",
    "displayName": "Rushank",
    "firstName": "Rushank",
    "lastName": "Sheta",
    "center": "Munster",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Arpan's Archers",
    "tier": "All"
  },
  {
    "userEmail": "2urmilpatel@gmail.com",
    "displayName": "Urmil",
    "firstName": "Urmil",
    "lastName": "Patel",
    "center": "St. Louis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Urmil's Umbrellas",
    "tier": "All"
  },
  {
    "userEmail": "tejzav@gmail.com",
    "displayName": "Tej",
    "firstName": "Tej",
    "lastName": "Zaveri",
    "center": "St. Louis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Swami's Lions",
    "tier": "All"
  },
  {
    "userEmail": "aksharp2978@gmail.com",
    "displayName": "Akshar",
    "firstName": "Akshar",
    "lastName": "Patel",
    "center": "St. Louis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Urmil's Umbrellas",
    "tier": "All"
  },
  {
    "userEmail": "mandarmb2@gmail.com",
    "displayName": "Mandar",
    "firstName": "Mandar",
    "lastName": "Brahmbhatt",
    "center": "St. Louis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Big Bodies",
    "tier": "All"
  },
  {
    "userEmail": "nkpatel4459@gmail.com",
    "displayName": "Niyam",
    "firstName": "Niyam",
    "lastName": "Patel",
    "center": "St. Louis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Team Prapti",
    "tier": "All"
  },
  {
    "userEmail": "ojpatel8218@hotnail.com",
    "displayName": "Oam",
    "firstName": "Oam",
    "lastName": "patel",
    "center": "St. Louis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Dev's D Line",
    "tier": "All"
  },
  {
    "userEmail": "sharmakhamir@gmail.com",
    "displayName": "Khamir",
    "firstName": "Khamir",
    "lastName": "Sharma",
    "center": "St. Louis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Team Prapti",
    "tier": "All"
  },
  {
    "userEmail": "riddhesh2907@gmail.com",
    "displayName": "Riddhesh",
    "firstName": "Riddhesh",
    "lastName": "Sharma",
    "center": "St. Louis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Dev's D Line",
    "tier": "All"
  },
  {
    "userEmail": "mehtagunatit@gmail.com",
    "displayName": "Gunatit",
    "firstName": "Gunatit",
    "lastName": "Mehta",
    "center": "St. Louis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "AP MW",
    "tier": "All"
  },
  {
    "userEmail": "aveepatel1007@gmail.con",
    "displayName": "Avee",
    "firstName": "Avee",
    "lastName": "Patel",
    "center": "St. Louis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Epic Failures",
    "tier": "All"
  },
  {
    "userEmail": "akshar.barot67@gmail.com",
    "displayName": "Akshar",
    "firstName": "Akshar",
    "lastName": "Barot",
    "center": "St. Louis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Reserve Officers' Training Corps (ROTC)",
    "tier": "All"
  },
  {
    "userEmail": "patelshalin2314@gmail.com",
    "displayName": "Shalin",
    "firstName": "Shalin",
    "lastName": "Patel",
    "center": "St. Louis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Reserve Officers' Training Corps (ROTC)",
    "tier": "All"
  },
  {
    "userEmail": "Sheth2106@gmail.com",
    "displayName": "Sumukh",
    "firstName": "Sumukh",
    "lastName": "Sheth",
    "center": "St. Louis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "AP MW",
    "tier": "All"
  },
  {
    "userEmail": "rohanpatel1509@gmail.com",
    "displayName": "Rohan",
    "firstName": "Rohan",
    "lastName": "Patel",
    "center": "St. Louis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Flaming Pandas",
    "tier": "All"
  },
  {
    "userEmail": "ayushpatel1230@icloud.com",
    "displayName": "Ayush",
    "firstName": "Ayush",
    "lastName": "Patel",
    "center": "St. Louis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Skimmed",
    "tier": "All"
  },
  {
    "userEmail": "mpatel241178@gmail.com",
    "displayName": "Rudra",
    "firstName": "Rudra",
    "lastName": "Patel",
    "center": "St. Louis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Arpan's Archers",
    "tier": "All"
  },
  {
    "userEmail": "Sheth2106@gmail.com",
    "displayName": "Sumukh",
    "firstName": "Sumukh",
    "lastName": "Sheth",
    "center": "St. Louis",
    "role": "Kishore",
    "group": "Kishore",
    "team": "AP MW",
    "tier": "All"
  },
  {
    "userEmail": "dhruvbhalada@gmail.com",
    "displayName": "Dhruv",
    "firstName": "Dhruv",
    "lastName": "Bhalada",
    "center": "Sterling Heights",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Manit's Mohanthals",
    "tier": "All"
  },
  {
    "userEmail": "ampatel307@gmail.com",
    "displayName": "Ansh",
    "firstName": "Ansh",
    "lastName": "Patel",
    "center": "Sterling Heights",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Flaming Pandas",
    "tier": "All"
  },
  {
    "userEmail": "Patelnrp9@gmail.com",
    "displayName": "Naman",
    "firstName": "Naman",
    "lastName": "Patel",
    "center": "Sterling Heights",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Flaming Pandas",
    "tier": "All"
  },
  {
    "userEmail": "vatsal.oza18@gmail.com",
    "displayName": "Vatsal",
    "firstName": "Vatsal",
    "lastName": "Oza",
    "center": "Sterling Heights",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Swami's Lions",
    "tier": "All"
  },
  {
    "userEmail": "jkparmy@gmail.com",
    "displayName": "Jay",
    "firstName": "Jay",
    "lastName": "Patel",
    "center": "Sterling Heights",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Mukhpath Sharp Shooters",
    "tier": "All"
  },
  {
    "userEmail": "sohanpatel326@gmail.com",
    "displayName": "Sohan",
    "firstName": "Sohan",
    "lastName": "Patel",
    "center": "Sterling Heights",
    "role": "Kishore",
    "group": "Kishore",
    "team": "Arpan's Archers",
    "tier": "All"
  }
]

// Function to generate a random password
function generateRandomPassword(length = 12) {
  return crypto.randomBytes(length).toString('base64').slice(0, length).replace(/[+/=]/g, '');
}

// Main function to process users and write passwords to the file
async function processUsers() {
  const passwordFile = fs.createWriteStream('user_passwords.txt');

  for (const user of users) {
    const randomPassword = generateRandomPassword(); // Generate random password for the user

    try {
      const userRecord = await admin.auth().createUser({
        email: user.userEmail,
        emailVerified: false,
        password: randomPassword,
        displayName: user.displayName,
        disabled: false,
      });

      console.log('Successfully created new user:', userRecord.uid);

      // Write email and password to the file
      passwordFile.write(`Email: ${user.userEmail}, Password: ${randomPassword}\n`);

      // Prepare user data with the additional 'role' field
      const userData = {
        uid: userRecord.uid,
        email: user.userEmail,
        displayName: user.displayName,
        firstName: user.firstName,
        lastName: user.lastName,
        center: user.center,
        role: user.role,
        group: user.group,
        team: user.team,
        tier: user.tier,
      };

      // Store the user data in Firestore
      await db.collection('userData').doc(userRecord.uid).set(userData);
      console.log(`User data stored in Firestore for ${user.userEmail}`);
    } catch (error) {
      console.error('Error creating new user:', error);
    }
  }

  // Ensure the file stream is closed
  passwordFile.end(() => {
    console.log('Passwords saved to user_passwords.txt');
  });
}

// Run the function
processUsers();
