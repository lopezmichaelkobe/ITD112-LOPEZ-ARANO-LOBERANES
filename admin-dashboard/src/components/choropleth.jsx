import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import HighchartsData from 'highcharts/modules/data';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Make sure this imports your Firebase configuration
import './choropleth.css';


// Initialize Highcharts modules
HighchartsMap(Highcharts);
HighchartsData(Highcharts);

const Choropleth = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [mapData, setMapData] = useState(null);

  // Fetch data from Firebase Firestore
  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cars")); // "cars" collection in Firestore
        const fetchedData = [];
        
        querySnapshot.forEach(doc => {
          const carData = doc.data();
          if (carData.country && carData.prevalence) {
            fetchedData.push({
              country: carData.country, // Country name from Firestore
              prevalence: carData.prevalence // Prevalence from Firestore
            });
          }
        });

        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
        setLoading(false);
      }
    })();
  }, []);

  // Fetch the map topology
  useEffect(() => {
    fetch('https://code.highcharts.com/mapdata/custom/world.topo.json')
      .then((response) => response.json())
      .then((topology) => {
        setMapData(topology);
      })
      .catch((error) => {
        console.error('Error loading map data:', error);
        setLoading(false);
      });
  }, []);

  // When both data and mapData are available, render the chart
  useEffect(() => {
    if (data.length > 0 && mapData) {
      const countryToISO = {
        "Armenia":"AM",
        "Belize":"BZ",
        "Bosnia and Herzegovina":"BA",
        "Ethiopia":"ET",
        "Hungary":"HU",
        "Israel":"IL",
        "Kuwait":"KW",
        "Mali":"ML",
        "Mauritius":"MU",
        "Portugal":"PT",
        "Poland":"PL",
        "Romania":"RO",
        "Vietnam":"VN",
        "Japan": "JP",
        "Philippines": "PH",
        "Malaysia" : "MY",
        "Madagascar" : "MG",
        "Mauritania" : "MR",
        "Sub-Saharan Africa (WB)": "SC",
        "Iceland" : "IS",
        "Haiti": "HT",
        "Saint Vincent and the Grenadines" : "VC",
        "Jamaica":"JM",
        "Senegal":"SN",
        "Middle East and North Africa":"BH",
        "United States":"US",
        "French Polynesia" :["AS","TO","TV"],
        "Samoa":"WS",
        "Fiji":"FJ",
        "Argentina":"AR",
        "India":"IN",
        "Malta":"MT",
        "Suriname":"SR",
        "Netherlands":"NL",
        "Trinidad and Tobago":"TT",
        "Congo":"CG",
        "Democratic Republic of Congo":"CD",
        "South Korea":"KR",
        "Angola":"AO",
        "France":"FR",
        "China":"CN",
        "Denmark":"DK",
        "Brazil":"BR",
        "Botswana":"BW",
        "Colombia":"CO",
        "Morocco":"MA",
        "Dominican Republic":"DO",
        "Bolivia":"BO",
        "Chad":"TD",
        "Ecuador":"EC",
        "Austria":"AT",
        "Saudi Arabia":"SA",
        "Uruguay":"UY",
        "Cambodia":"KH",
        "Tanzania":"TZ",
        "Lesotho":"LS",
        "Sierra Leone":"SL",
        "Malawi":"MW",
        "Kenya":"KE",
        "Central African Republic":"CF",
        "Spain":"ES",
        "Mozambique":"MZ",
        "Cameroon":"CM",
        "Jordan":"JO",
        "Mexico":"MX",
        "South Africa":"ZA",
        "Belgium":"BE",
        "Latvia":"LV",
        "Albania":"AL",
        "Peru":"PE",
        "Kazakhstan":"KZ",
        "Mongolia":"MN",
        "Russia":"RU",
        "Costa Rica":"CR",
        "Iran":"IR",
        "Germany":"DE",
        "Azerbaijan":"AZ",
        "Dominica":"DM",
        "Montenegro":"ME",
        "Nicaragua":"NI",
        "Eswatini":"SZ",
        "El Salvador":"SV",
        "Turkmenistan":"TM",
        "Norway":"NO",
        "Myanmar":"MM",
        "Algeria":"DZ",
        "Gabon":"GA",
        "Czechia":"CZ",
        "Italy":"IT",
        "Kyrgyzstan":"KG",
        "Greece":"GR",
        "Namibia":"NA",
        "Serbia":"RS",
        "Vanuatu":"VU",
        "Pakistan":"PK",
        "Finland":"FI",
        "Barbados":"BB",
        "Tunisia":"TN",
        "Cuba":"CU",
        "Switzerland":"CH",
        "Brunei":"BN",
        "Bangladesh":"BD",
        "Djibouti":"DJ",
        "Sri Lanka":"LK",
        "Ghana":"GH",
        "Burkina Faso":"BF",
        "Belarus":"BY",
        "Indonesia":"ID",
        "Sudan": "SD",
        "North Korea":"KP",
        "Somalia":"SO",
        "Liberia":"LR",
        "Afghanistan":"AF",
        "Sweden":"SE",
        "Lebanon":"LB",
        "Nepal":"NP",
        "Cyprus":"CY",
        "Australia":"AU",
        "Sao Tome and Principe":"ST",
        "Lithuania":"LT",
        "Turkey":"TR",
        "Yemen":"YE",
        "East Timor":"TL",
        "Thailand":"TH",
        "Honduras":"HN",
        "Venezuela":"VE",
        "Nigeria":"NG",
        "Slovakia":"SK",
        "Ireland":"IE",
        "Iraq":"IQ",
        "Cape Verde":"CV",
        "Croatia":"HR",
        "Oman":"OM",
        "Slovenia":"SI",
        "United Arab Emirates":"AE",
        "Togo":"TG",
        "Ukraine":"UA",
        "Papua New Guinea":"PG",
        "Gambia":"GM",
        "Luxembourg":"LU",
        "Egypt":"EG",
        "Paraguay":"PY",
        "Georgia":"GE",
        "Estonia":"EE",
        "Kiribati":"KI",
        "Canada":"CA",
        "Benin":"BJ",
        "Uzbekistan":"UZ",
        "Laos":"LA",
        "Solomon Islands":"SB",
        "United Kingdom":"GB",
        "Guatemala":"GT",
        "Rwanda":"RW",
        "Bulgaria":"BG",
        "Chile":"CL",
        "New Zealand":"NZ",
        
        "Western Sahara":"EH",
        "Eritrea":"ER",
        "Zimbabwe":"ZW",
        "Zambia":"ZM",
        "Uganda":"UG",
        "South Sudan":"SS",
        "Niger":"NE",
        "Libya":"LY",
        "Guyana":"GY",
        "Panama":"PA",
        "Greenland":"GL",
        "Taiwan":"TW",

      
      };

      // Map the data to ISO codes using the countryToISO mapping
      const mappedData = data.map((item) => ({
        isoCode: countryToISO[item.country], // Use the country name to get the ISO code
        prevalence: item.prevalence,
      }));

      Highcharts.mapChart('container', {
        chart: {
          map: mapData,
        },
        colors: [
          'rgba(255,0,0,1)',
          'rgba(255,0,0,1)',
          'rgba(19,64,117,0.4)',
          'rgba(19,64,117,0.5)',
          'rgba(19,64,117,0.6)',
          'rgba(19,64,117,0.8)',
          'rgba(19,64,117,1)',
        ],
        title: {
          text: 'Prevalence by Country',
          align: 'left',
        },
        title: {
          text: 'Prevalence by Country',
          align: 'left',
        },
        subtitle: {
          text: 'This choropleth map visualizes the world undernourishment prevalence rate across different countries. The map uses color coding to reflect the intensity of undernourishment prevalence, with darker shades indicating higher rates of hunger and lighter shades indicating lower rates. It allows users to easily identify regions with the most urgent need for interventions to combat hunger and malnutrition.<br /><br />Hover the mouse cursor over each specific country to individually determine their prevalence rate. You can also filter them by each color-coded percentage rating.',
          align: 'center',
          style: {
            fontSize: '14px',
            fontWeight: 'normal',
            color: '#666',
            paddingRight: '50px', // Adding 50px right indentation
          },
        },        
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            align: 'right',
          },
        },
        mapView: {
          fitToGeometry: {
            type: 'MultiPoint',
            coordinates: [
              [-164, 54],
              [-35, 84],
              [179, -38],
              [-68, -55],
            ],
          },
        },
        legend: {
          title: {
            text: 'Prevalence (%)',
            style: {
              color: Highcharts.defaultOptions?.legend?.title?.style?.color || 'black',
            },
          },
          align: 'left',
          verticalAlign: 'bottom',
          floating: true,
          layout: 'vertical',
          valueDecimals: 0,
          backgroundColor: Highcharts.defaultOptions?.legend?.backgroundColor || 'rgba(255, 255, 255, 0.85)',
          symbolRadius: 0,
          symbolHeight: 14,
        },
        colorAxis: {
          dataClasses: [
            { to: 3, color: '#0000ee' },
            { from: 3, to: 10, color: '#00eeee' },
            { from: 10, to: 15, color: '#00ee00' },
            { from: 15, to: 20, color: '#bbee00' },
            { from: 20, to: 30, color: '#eeee00' },
            { from: 30, to: 50, color: '#ee6600' },
            { from: 50, to: 70, color: '#bb0000' },
          ],
        },
        series: [
          {
            data: mappedData.map((item) => ({
              code: item.isoCode,  // map 'iso-a2' key with Firebase 'country'
              value: item.prevalence,
            })),
            joinBy: ['iso-a2', 'code'],
            animation: true,
            name: 'Prevalence',
            tooltip: {
              valueSuffix: '% of Prevalence of Undernourishment',
            },
            shadow: false,
          },
        ],
      });
    }
  }, [data, mapData]);

  return (
    <div>
      <div
        id="container"
        style={{
          height: '900px',
          minWidth: '610px',
          maxWidth: '1400px',
          margin: '0 auto',
          marginBottom: '20px',
        }}
      >
        {loading && (
          <div className="loading" style={{ marginTop: '10em', textAlign: 'center', color: 'gray', marginBottom: '20px' }}>
            <i className="icon-spinner icon-spin icon-large"></i>
            Loading data...
          </div>
        )}
      </div>
    </div>
  );
};

export default Choropleth;
