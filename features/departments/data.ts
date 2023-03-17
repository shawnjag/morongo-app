export default [
    {
        name: "Human Resources",
        icon: "account-group",
        sortName: "hr",
        phone: "+19517555180",
        pageId: '2779'
    },
    {
        name: "Construction Services",
        icon: "account-hard-hat",
        sortName: "construction",
        phone: "+19517555230",
        pageId: '2784'
    },
    {
        name: "Realty and Planning",
        icon: "home-group",
        sortName: "realty",
        phone: "+19515726152",
        pageId: '2789'

    },
    {
        name: "Community Outreach",
        icon: "charity",
        sortName: "community-outreach",
        phone: "+19517555063",
        pageId: '129'
    },
    {
        name: "Gaming Agency",
        icon: "slot-machine",
        sortName: "gaming",
        phone: "+19518493080",
        pageId: '528'
    },
    {
        name: "Emergency Services",
        icon: "car-brake-alert",
        sortName: "emergency",
        phone: "+19517555215",
        pageId: '500'
    },
    {
        name: "Fire Department",
        icon: "fire",
        sortName: "fire",
        phone: "+19518497193",
        pageId: '496'

    },
    {
        name: "Tribal Police",
        icon: "police-badge",
        sortName: "police",
        phone: "+19517555302",
        pageId: '2972'
    },
    {
        name: "Environmental Protection",
        icon: "recycle",
        sortName: "environmental",
        phone: "+19515726187",
        pageId: '3020'
    },
    {
        name: "Water Department",
        icon: "water-pump",
        sortName: "water",
        phone: "+19517555264",
        pageId: '526'
    },
    {
        name: "Public Works",
        icon: "bulldozer",
        sortName: "publicworks",
        phone: "+19517555267",
        pageId: '524'
    },
    {
        name: "Transportation",
        icon: "bus",
        sortName: "transportation",
        phone: "+19517555269",
        pageId: '530'
    },
    {
        name: "Morongo School",
        icon: "school",
        sortName: "education",
        phone: "+19515726082",
        pageId: '125'
    },
    {
        name: "Social Services",
        icon: "hand-heart",
        sortName: "socialservices",
        phone: "+19517555167",
        pageId: '506'
    },
    {
        name: "Finance",
        icon: "currency-usd",
        sortName: "finance",
        phone: "+19517555317",
        pageId: ''
    },
    {
        name: "Community Center",
        icon: "account-supervisor-circle",
        sortName: "communitycenter",
        "pageId": '532',
        phone: "+19517555162",
    },
    {
        name: "Elders Program",
        icon: "human-handsup",
        sortName: "elders",
        pageId: '534',
        phone: "+19517555174"
    },
    {
        name: "Tribal TANF",
        icon: "handshake",
        sortName: "tanf",
        pageId: '127',
        phone: "+19517555178"
    },
    {
        name: "Tribal Court",
        icon: "gavel",
        sortName: "court",
        phone: "+19515726031",
        pageId: '70'
    },
    {
        name: "Tribal Council",
        icon: "seat",
        sortName: "council",
        phone: "+19515726069",
        pageId: '66'
    },
    {
        name: "Tribal Affairs",
        icon: "check-decagram",
        sortName: "affairs",
        phone: "+19517555103",
        pageId: ''
    },
    {
        name: "General Inquiries",
        icon: "help-circle-outline",
        sortName: "administration",
        phone: "+19518494697",
        pageId: ''
    }
].sort((a, b) => {
    if (b.sortName > a.sortName) return -1
    return 1
})