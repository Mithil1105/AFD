// Centralized Projects dataset
// Shape:
// {
//   id: string,
//   title: string,
//   location: string,
//   year: string,
//   type: "tourism" | "forest",
//   category: "interpretation-centre" | "sculpture" | "infrastructure" | "tableaux" | "achievement" | "private" | "government",
//   description: string,
//   features: string[],
//   image?: string
// }

export const projects = [
    // Demo 8 items (kept representative as per snippet intent)
    {
        id: "demo-1",
        title: "Eco Trail Signage – Gir Forest",
        location: "Gir, Gujarat",
        year: "2024",
        type: "forest",
        category: "infrastructure",
        description: "Modular reflective wayfinding with habitat-safe anchors.",
        features: ["Reflective signage", "Habitat-safe anchors", "Low maintenance", "Weatherproof"]
    },
    {
        id: "demo-2",
        title: "Visitor Centre Revamp – Saputara",
        location: "Saputara, Dang",
        year: "2023",
        type: "tourism",
        category: "interpretation-centre",
        description: "Exhibit routing and shade-first queuing with native finishes.",
        features: ["Exhibit routing", "Shade-first queuing", "Native finishes"]
    },
    {
        id: "demo-3",
        title: "Wetland Boardwalk – Nalsarovar",
        location: "Nalsarovar, Gujarat",
        year: "2023",
        type: "forest",
        category: "infrastructure",
        description: "Elevated boardwalk with erosion control and bird-safe sightlines.",
        features: ["Elevated boardwalk", "Erosion control", "Bird-safe sightlines"]
    },
    {
        id: "demo-4",
        title: "Heritage Trail – Polo Forest",
        location: "Vijaynagar, Gujarat",
        year: "2022",
        type: "tourism",
        category: "infrastructure",
        description: "Interpretive nodes and emergency wayfinding.",
        features: ["Interpretive nodes", "Emergency wayfinding", "Low-impact materials"]
    },
    {
        id: "demo-5",
        title: "Canopy Lookout – Shoolpaneshwar",
        location: "Narmada, Gujarat",
        year: "2022",
        type: "forest",
        category: "infrastructure",
        description: "Lightweight lookout deck with FRP beams and wind-tested rails.",
        features: ["FRP beams", "Wind-tested rails", "Lightweight structure"]
    },
    {
        id: "demo-6",
        title: "Campsite Amenities – Banni Grasslands",
        location: "Kutch, Gujarat",
        year: "2021",
        type: "tourism",
        category: "infrastructure",
        description: "Low-impact sanitation, night-safe lighting, and waste segregation points.",
        features: ["Low-impact sanitation", "Night-safe lighting", "Waste segregation"]
    },
    {
        id: "demo-7",
        title: "Riverfront Trail Links",
        location: "Ahmedabad, Gujarat",
        year: "2021",
        type: "tourism",
        category: "infrastructure",
        description: "Seating pods, native planting pockets, and cyclist-safe merge zones.",
        features: ["Seating pods", "Native planting", "Cyclist-safe merges"]
    },
    {
        id: "demo-8",
        title: "Habitat Buffer Fencing",
        location: "Girnar, Gujarat",
        year: "2020",
        type: "forest",
        category: "infrastructure",
        description: "Non-intrusive fencing with animal corridors and maintenance gates.",
        features: ["Animal corridors", "Maintenance gates", "Non-intrusive design"]
    },

    // Highlights and mapped items
    {
        id: "ambardi-pride-2023",
        title: "World’s Largest Asiatic Lion Pride Sculpture",
        location: "Ambardi Safari Park, Dhari/Amreli",
        year: "2023",
        type: "tourism",
        category: "achievement",
        description: "Record-setting ferro-cement lion pride sculpture commissioned by TCGL; Limca Book of Records (2025).",
        features: ["Base 165×68 ft", "Lion 31 ft / 60 ft", "Lioness 21 ft / 46 ft", "Cubs 9.6×16.5 & 8.6×22 ft", "Ferro-cement build"]
    },
    {
        id: "namami-gange-2019",
        title: "Namami Gange Exhibits",
        location: "Varanasi/Kanpur",
        year: "2019",
        type: "tourism",
        category: "achievement",
        description: "Educational exhibits developed in collaboration with the Wildlife Institute of India.",
        features: ["Educational exhibits", "Sarnath & Kanpur", "With WII"]
    },
    {
        id: "cms-cop13-2018",
        title: "CMS COP-13 Birds & Marine Sculptures; Tableaux Awards",
        location: "Various",
        year: "2018",
        type: "tourism",
        category: "achievement",
        description: "Migratory birds and marine species sculptures; six tableaux awards (2006–2014).",
        features: ["Migratory birds", "Marine species", "Six tableaux awards"]
    },
    {
        id: "reliance-circle-2016",
        title: "Reliance Circle Bronze – Pandit Deendayal Upadhyay",
        location: "Gandhinagar",
        year: "2016",
        type: "tourism",
        category: "sculpture",
        description: "Public bronze statue installation at Kudasan Circle.",
        features: ["Bronze statue", "Public realm", "Landmark installation"]
    },
    {
        id: "geer-butterfly-2024",
        title: "GEER Butterfly Park / Hingolgadh Entry Gates",
        location: "Gandhinagar / Hingolgadh",
        year: "2024",
        type: "forest",
        category: "infrastructure",
        description: "Entry gates and ancillary infrastructure for protected areas.",
        features: ["Entry gates", "Signage", "Protected area compliance"]
    },
    {
        id: "shivrajpur-gates-2019",
        title: "Shivrajpur Beach Gates",
        location: "Dwarka, Gujarat",
        year: "2019",
        type: "tourism",
        category: "infrastructure",
        description: "Two main gates and one entry gate for Blue Flag beach destination.",
        features: ["Blue Flag beach", "Two main gates", "Entry gate"]
    },
    {
        id: "corbett-ic-2019",
        title: "Corbett TR Interpretation Centre",
        location: "Uttarakhand",
        year: "2019",
        type: "forest",
        category: "interpretation-centre",
        description: "Interpretation and exhibition spaces at Corbett Tiger Reserve.",
        features: ["Interpretation centre", "Exhibition", "Visitor education"]
    },
    {
        id: "platinum-van-2022",
        title: "Platinum Van, Nadiad — Ferro-cement Gate",
        location: "Nadiad, Gujarat",
        year: "2022",
        type: "forest",
        category: "infrastructure",
        description: "Ferro-cement gate and life-size sculptures in a public park setting.",
        features: ["Ferro-cement gate", "Life-size sculptures", "Public park"]
    },
    {
        id: "rajmahal-fossil-park-2022",
        title: "Rajmahal Fossil Park — Santhal Diorama",
        location: "Jharkhand",
        year: "2022",
        type: "forest",
        category: "interpretation-centre",
        description: "Cultural diorama highlighting Santhal heritage within fossil park context.",
        features: ["Cultural diorama", "Interpretation", "Educational"]
    },
    {
        id: "science-city-2021",
        title: "Science City Installations",
        location: "Ahmedabad, Gujarat",
        year: "2021",
        type: "tourism",
        category: "private",
        description: "Fibreglass installations and stone gate commissioned by private partners.",
        features: ["Fibreglass installations", "Stone gate", "Private commission"]
    },
    {
        id: "pugmark-qmulus-2024",
        title: "Pugmark Qmulus — Ambardi/Padala ICs + Kutch Gates",
        location: "Amreli / Kutch",
        year: "2024",
        type: "tourism",
        category: "private",
        description: "Interpretation centres for Ambardi and Padala; entrance gates at Chari Dhand and Guneri.",
        features: ["Ambardi IC", "Padala IC", "Chari Dhand gate", "Guneri gate"]
    },
    {
        id: "tableaux-2012",
        title: "National Voters’ Day Tableau",
        location: "Bhavnagar, Gujarat",
        year: "2012",
        type: "tourism",
        category: "tableaux",
        description: "Election Department feature for National Voters’ Day.",
        features: ["Public awareness", "Parade display"]
    },
    {
        id: "tableaux-2014-first-prize",
        title: "Republic Day Tableau (First Prize)",
        location: "Khedbrahma, Sabarkantha",
        year: "2014",
        type: "tourism",
        category: "tableaux",
        description: "Tribal Development Department Republic Day tableau — First Prize.",
        features: ["Republic Day", "First Prize"]
    },
    {
        id: "narara-2016",
        title: "Narara Marine National Park – Interpretation Centre",
        location: "Jamnagar, Gujarat",
        year: "2016",
        type: "forest",
        category: "interpretation-centre",
        description: "Marine biodiversity interpretation centre for visitors.",
        features: ["Marine biodiversity", "Visitor engagement"]
    },
    {
        id: "victoria-rakshak-2018",
        title: "Victoria Park & Rakshak Van Interpretation Centres",
        location: "Bhavnagar / Bhuj",
        year: "2018",
        type: "forest",
        category: "interpretation-centre",
        description: "Two interpretation centres supporting local conservation.",
        features: ["Dual ICs", "Local conservation", "Wayfinding"]
    },
    {
        id: "ambardi-dev-2023",
        title: "Ambardi Safari Park Development",
        location: "Dhari, Amreli",
        year: "2019–2023",
        type: "tourism",
        category: "government",
        description: "Tourism Corporation of Gujarat Ltd. led development of safari park experiences.",
        features: ["Safari park", "Visitor amenities", "TCGL"]
    },
    {
        id: "aayogya-van-2020",
        title: "Aarogya Van • Valley of Flowers • Ekta Nursery • Cactus Garden",
        location: "Narmada DCF",
        year: "2020",
        type: "tourism",
        category: "government",
        description: "Landscape and educational installations across multiple sites.",
        features: ["Landscape", "Educational installs", "Multi-site"]
    },
    {
        id: "riverfront-lion-2014",
        title: "Lion Family Sculptures — Ahmedabad Riverfront",
        location: "Ahmedabad, Gujarat",
        year: "2014",
        type: "tourism",
        category: "achievement",
        description: "Displayed in presence of PM Narendra Modi and President Xi Jinping.",
        features: ["Public display", "High-profile event"]
    },
    {
        id: "sardar-patel-2012",
        title: "Statue of Shri Sardar Patel",
        location: "Sardar Sarovar Nigam Ltd.",
        year: "2012–2013",
        type: "tourism",
        category: "government",
        description: "Statue execution for SSNNL across 2012–2013.",
        features: ["Statue execution", "Government project"]
    }
];

export function countByCategory(items = projects) {
    return items.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {});
}


