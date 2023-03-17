
export type WP_Post = News | WP_Event | Slide | Event | Meeting

type Post = {
    id: number,
    date: string,
    title: { rendered: string },
    content: { rendered: string },
    _embedded?: {
        "wp:featuredmedia": [{
            source_url: string,
            media_details: {
                sizes: {
                    thumbnail: {
                        source_url: string
                    }
                }
            }
        }]
    }
}
type News = Post & { type: 'post', categories: number[] }
type Slide = Post & {
    type: 'slide' | 'ml-slide',
    _embedded: Required<Post['_embedded']>
}
export type WP_Event = {
    "id": number,
    "global_id": "string",
    "global_id_lineage": [
        "string"
    ],
    "author": number,
    "date": "string",
    "date_utc": "string",
    "modified": "string",
    "modified_utc": "string",
    "status": "string",
    "url": "string",
    "rest_url": "string",
    "title": "string",
    "description": "string",
    "excerpt": "string",
    "slug": "string",
    "image": {
        "url": "string",
        "id": number,
        "extension": "string",
        "width": number,
        "height": number,
        "sizes": [
            {
                "width": number,
                "height": number,
                "mime-type": "string",
                "url": "string"
            }
        ]
    },
    "all_day": true,
    "start_date": "string",
    "start_date_details": [
        {
            "year": number,
            "month": number,
            "day": number,
            "hour": number,
            "minutes": number,
            "seconds": number
        }
    ],
    "end_date": "string",
    "end_date_details": [
        {
            "year": number,
            "month": number,
            "day": number,
            "hour": number,
            "minutes": number,
            "seconds": number
        }
    ],
    "utc_start_date": "string",
    "utc_start_date_details": [
        {
            "year": number,
            "month": number,
            "day": number,
            "hour": number,
            "minutes": number,
            "seconds": number
        }
    ],
    "utc_end_date": "string",
    "utc_end_date_details": [
        {
            "year": number,
            "month": number,
            "day": number,
            "hour": number,
            "minutes": number,
            "seconds": number
        }
    ],
    "timezone": "string",
    "timezone_abbr": "string",
    "cost": "string",
    "cost_details": [
        {
            "currency_symbol": "string",
            "currency_position ": "prefix",
            "values": [
                0
            ]
        }
    ],
    "website": "string",
    "show_map": true,
    "show_map_link": true,
    "hide_from_listings": true,
    "sticky": true,
    "featured": true,
    "categories": [
        {
            "id": number,
            "name": "string",
            "slug": "string",
            "taxonomy": "string",
            "description": "string",
            "parent": number,
            "count": number,
            "url": "string",
            "urls": [
                "string"
            ]
        }
    ],
    "tags": [
        {
            "id": number,
            "name": "string",
            "slug": "string",
            "taxonomy": "string",
            "description": "string",
            "parent": number,
            "count": number,
            "url": "string",
            "urls": [
                "string"
            ]
        }
    ],
    "venue": {
        "id": number,
        "global_id": "string",
        "global_id_lineage": [
            "string"
        ],
        "author": number,
        "date": "string",
        "date_utc": "string",
        "modified": "string",
        "modified_utc": "string",
        "status": "string",
        "url": "string",
        "venue": "string",
        "description": "string",
        "excerpt": "string",
        "slug": "string",
        "image": {
            "url": "string",
            "id": number,
            "extension": "string",
            "width": number,
            "height": number,
            "sizes": [
                {
                    "width": number,
                    "height": number,
                    "mime-type": "string",
                    "url": "string"
                }
            ]
        },
        "show_map": true,
        "show_map_link": true,
        "address": "string",
        "city": "string",
        "country": "string",
        "province": "string",
        "state": "string",
        "zip": "string",
        "phone": "string",
        "website": "string",
        "stateprovince": "string",
        "geo_lat": number,
        "geo_lng": number
    },
    "organizer": [
        {
            "id": number,
            "global_id": "string",
            "global_id_lineage": [
                "string"
            ],
            "author": number,
            "date": "string",
            "date_utc": "string",
            "modified": "string",
            "modified_utc": "string",
            "status": "string",
            "url": "string",
            "organizer": "string",
            "description": "string",
            "excerpt": "string",
            "slug": "string",
            "image": {
                "url": "string",
                "id": number,
                "extension": "string",
                "width": number,
                "height": number,
                "sizes": [
                    {
                        "width": number,
                        "height": number,
                        "mime-type": "string",
                        "url": "string"
                    }
                ]
            },
            "phone": "string",
            "website": "string",
            "email": "string"
        }
    ]
}


type Meeting = Post & {
    type: 'meeting',
    meeting_date: string,
    meeting_type: string,
    meeting_location: string,
    meeting_cancelled: "Yes" | "No",
    agenda: string | false,
    minutes: string | false,
    mailer: string | false,
    highlights: string | false
}