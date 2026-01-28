// tripPlannerData.js - Trip Planner content for Sri Lanka tourism

// Import images - using existing images from the img folder
// Note: These will fall back to placeholder if images don't exist
import newyr2 from '../page/TripPlanner/img/newyr2.png';
import thaip from '../page/TripPlanner/img/thaipongal.png';
import asala from '../page/TripPlanner/img/asala.png';
import adam from '../page/TripPlanner/img/adams.png';
import ktrgm from '../page/TripPlanner/img/ktrgma.png';
import vesk1 from '../page/TripPlanner/img/vesk1.png';
import chrstms from '../page/TripPlanner/img/chrstms.png';
import rmsn from '../page/TripPlanner/img/rmsn3.png';
import poson from '../page/TripPlanner/img/poson.png';
import nllr from '../page/TripPlanner/img/nllr.png';
import sgry from '../page/TripPlanner/img/sgry.png';
import gll from '../page/TripPlanner/img/gll.png';
import dld from '../page/TripPlanner/img/dld.png';
import jya from '../page/TripPlanner/img/jya.png';
import jfn from '../page/TripPlanner/img/jfn1.png';
import bkr from '../page/TripPlanner/img/bkr.png';
import rvn from '../page/TripPlanner/img/rvn.png';
import dnh from '../page/TripPlanner/img/dnh.png';
import snt from '../page/TripPlanner/img/snt.png';
import dyl from '../page/TripPlanner/img/dyl.png';

export const categories = [
  { id: 'cultural', name: 'Cultural Events', icon: 'cultural' },
  { id: 'religious', name: 'Religious Events', icon: 'religious' },
  { id: 'historical', name: 'Historical Places', icon: 'historical' },
  { id: 'waterfalls', name: 'Waterfalls', icon: 'waterfalls' },
];

export const culturalEvents = [
  {
    id: 1,
    title: 'Sinhala and Tamil New Year',
    description: 'The traditional New Year celebration marks the end of the harvest season and the beginning of the new solar year. Families gather to enjoy traditional games, food, and rituals.',
    date: 'April 13th - 14th',
    location: 'Nationwide',
    image: newyr2,
    link: 'https://www.ceylonexpeditions.com/sinhala-tamil-new-sri-lanka',
  },
  {
    id: 2,
    title: 'Thai Pongal',
    description: 'A harvest festival celebrated by Tamil Hindus, marking the beginning of the sun\'s six-month journey northward. Rice is cooked in milk and offered to the Sun God.',
    date: 'January (2nd week)',
    location: 'Northern & Eastern Provinces',
    image: thaip,
    link: 'https://www.jagranjosh.com/general-knowledge/why-pongal-festival-is-celebrated-1547213907-1',
  },
  {
    id: 3,
    title: 'Kandy Esala Perahera',
    description: 'One of the oldest and grandest Buddhist festivals, featuring a procession of decorated elephants, traditional dancers, drummers, and the Sacred Tooth Relic.',
    date: 'August (Full Moon)',
    location: 'Kandy',
    image: asala,
    link: 'https://sridaladamaligawa.lk/kandy-esala-perahera/',
  },
  {
    id: 4,
    title: "Adam's Peak Pilgrimage",
    description: 'A sacred mountain pilgrimage site revered by Buddhists, Hindus, Muslims, and Christians. The footprint at the summit holds religious significance for all faiths.',
    date: 'December - May',
    location: 'Ratnapura District',
    image: adam,
    link: 'https://www.britannica.com/place/Adams-Peak',
  },
  {
    id: 5,
    title: 'Kataragama Festival',
    description: 'An annual festival at the Kataragama temple dedicated to God Skanda. Devotees perform fire-walking, body piercing, and other acts of devotion.',
    date: 'July - August',
    location: 'Kataragama',
    image: ktrgm,
    link: 'https://www.highelmstravel.com/kataragama-perahera.html',
  },
];

export const religiousEvents = [
  {
    id: 1,
    title: 'Vesak',
    description: 'The most important Buddhist festival commemorating the birth, enlightenment, and passing of Lord Buddha. Colorful lanterns and pandals light up the streets.',
    date: 'May (Full Moon)',
    location: 'Nationwide',
    image: vesk1,
    link: 'https://en.wikipedia.org/wiki/Vesak',
  },
  {
    id: 2,
    title: 'Christmas',
    description: 'Celebrated by Sri Lankan Christians with midnight masses, carol services, and festive decorations. Negombo and Colombo host the largest celebrations.',
    date: 'December 24th - 25th',
    location: 'Nationwide',
    image: chrstms,
    link: 'https://www.tourslanka.com/events-festivals/christmas-in-sri-lanka/',
  },
  {
    id: 3,
    title: 'Ramadan',
    description: 'The holy month of fasting observed by Muslims. The end of Ramadan is celebrated with Eid ul-Fitr, featuring prayers, feasts, and family gatherings.',
    date: 'Varies (Islamic Calendar)',
    location: 'Nationwide',
    image: rmsn,
    link: 'https://nexttravelsrilanka.com/ramadan/',
  },
  {
    id: 4,
    title: 'Poson',
    description: 'Commemorates the introduction of Buddhism to Sri Lanka by Arahat Mahinda. Anuradhapura hosts the main celebrations at Mihintale.',
    date: 'June (Full Moon)',
    location: 'Anuradhapura, Mihintale',
    image: poson,
    link: 'https://en.wikipedia.org/wiki/Poson',
  },
  {
    id: 5,
    title: 'Nallur Festival',
    description: 'A 25-day Hindu festival at the famous Nallur Kandaswamy Temple in Jaffna. Features elaborate processions, traditional music, and devotional activities.',
    date: 'August - September',
    location: 'Jaffna',
    image: nllr,
    link: 'https://www.tripadvisor.com/Attraction_Review-g304135-d10020546-Reviews-Nallur_Kandaswamy_Kovil_Festival-Jaffna_Northern_Province.html',
  },
];

export const historicalPlaces = [
  {
    id: 1,
    title: 'Sigiriya',
    description: 'An ancient rock fortress and UNESCO World Heritage Site. Known for its stunning frescoes, mirror wall, and the remains of an ancient palace at the summit.',
    date: 'Open Year-round',
    location: 'Dambulla, Central Province',
    image: sgry,
    link: 'https://www.ugaescapes.com/ugabay/leisure/things-to-do/sigiriya.html',
  },
  {
    id: 2,
    title: 'Galle Fort',
    description: 'A UNESCO World Heritage Site built by the Portuguese in 1588 and extensively fortified by the Dutch. Features colonial architecture and charming streets.',
    date: 'Open Year-round',
    location: 'Galle, Southern Province',
    image: gll,
    link: 'https://www.afar.com/places/galle-fort',
  },
  {
    id: 3,
    title: 'Temple of the Sacred Tooth Relic',
    description: 'Sri Dalada Maligawa houses the sacred tooth relic of Lord Buddha. A UNESCO World Heritage Site and the most important Buddhist temple in Sri Lanka.',
    date: 'Open Year-round',
    location: 'Kandy, Central Province',
    image: dld,
    link: 'https://sridaladamaligawa.lk',
  },
  {
    id: 4,
    title: 'Jaya Sri Maha Bodhi',
    description: 'The oldest historically documented tree in the world, grown from a cutting of the original Bodhi tree under which Buddha attained enlightenment.',
    date: 'Open Year-round',
    location: 'Anuradhapura',
    image: jya,
    link: 'https://www.srimahabodhi.lk/web/about/',
  },
  {
    id: 5,
    title: 'Jaffna Fort',
    description: 'One of the best-preserved Dutch forts in Asia, originally built by the Portuguese in 1619. Offers panoramic views of the Jaffna lagoon.',
    date: 'Open Year-round',
    location: 'Jaffna, Northern Province',
    image: jfn,
    link: 'https://www.jaffnatours.lk/jaffna-fort',
  },
];

export const waterfalls = [
  {
    id: 1,
    title: "Baker's Falls",
    description: 'A stunning 20-meter waterfall located in the Horton Plains National Park. Named after British explorer Sir Samuel Baker who discovered it in 1845.',
    date: 'Best: January - April',
    location: 'Horton Plains, Nuwara Eliya',
    image: bkr,
    link: 'https://www.epicsrilankaholidays.com/things-to-do/horton-plains/bakers-falls.html',
  },
  {
    id: 2,
    title: 'Ravana Falls',
    description: 'A popular 25-meter waterfall associated with the legend of King Ravana from the Ramayana. One of the widest falls in Sri Lanka.',
    date: 'Best: May - November',
    location: 'Ella, Uva Province',
    image: rvn,
    link: 'https://www.lovesrilanka.org/ravana-falls/',
  },
  {
    id: 3,
    title: 'Dunhinda Falls',
    description: 'Known as the "Bridal Veil Waterfall" due to its misty spray. At 64 meters, it\'s one of the most beautiful waterfalls in Sri Lanka.',
    date: 'Best: May - December',
    location: 'Badulla, Uva Province',
    image: dnh,
    link: 'https://travelwithuma.com/waterfall/dunhinda-falls/',
  },
  {
    id: 4,
    title: "St. Clair's Falls",
    description: 'Known as the "Little Niagara of Sri Lanka." A spectacular 80-meter waterfall surrounded by tea plantations.',
    date: 'Best: May - November',
    location: 'Kothmale, Central Province',
    image: snt,
    link: 'https://miraclesrilanka.com/st-clairs-falls/',
  },
  {
    id: 5,
    title: 'Diyaluma Falls',
    description: "Sri Lanka's second highest waterfall at 220 meters. Features natural infinity pools at the top with breathtaking views.",
    date: 'Best: April - September',
    location: 'Koslanda, Uva Province',
    image: dyl,
    link: 'https://srilankadriverguide.com/diyaluma-falls/',
  },
];

// Combined data export
export const tripPlannerData = {
  cultural: culturalEvents,
  religious: religiousEvents,
  historical: historicalPlaces,
  waterfalls: waterfalls,
};

export default tripPlannerData;
