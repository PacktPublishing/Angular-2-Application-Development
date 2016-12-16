/*

Twitter definitions from https://github.com/Volox/typed-twit licenced under the MIT license:

Copyright (c) 2016 Volox

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

declare namespace Twitter {
    export type ResultType = 'mixed' | 'popular' | 'recent';

    // See https://dev.twitter.com/overview/api/tweets#obj-contributors
    export interface Contributors {
        id: number;
        id_str: number;
        screen_name: string;
    }

    // See https://dev.twitter.com/overview/api/entities
    export interface HashtagEntity {
        indices: number[];
        text: string;
    }
    export interface Size {
        h: number;
        w: number;
        resize: 'crop' | 'fit';
    }
    export interface Sizes {
        thumb: Size;
        large: Size;
        medium: Size;
        small: Size;
    }
    export interface MediaEntity {
        id: number;
        id_str: string;
        indices: number[];
        url: string;
        display_url: string;
        expanded_url: string;
        media_url: string;
        media_url_https: string;
        sizes: Sizes;
        source_status_id: number;
        source_status_id_str: string;
        type: string;
    }
    export interface UrlEntity {
        url: string;
        display_url: string;
        expanded_url: string;
        indices: number[];
    }
    export interface UserMentionEntity {
        id: number;
        id_str: string;
        indices: number[];
        name: string;
        screen_name: string;
    }
    export interface Entities {
        hashtags: HashtagEntity[];
        media: MediaEntity[];
        urls: UrlEntity[];
        user_mentions: UserMentionEntity[];
    }

    // See https://dev.twitter.com/overview/api/users
    export interface User {
        contributors_enabled: boolean;
        created_at: string;
        default_profile: string;
        default_profile_image: string;
        description: string;
        entities: Entities;
        favourites_count: number;
        follow_request_sent?: boolean;
        following?: boolean;
        followers_count: number;
        friends_count: number;
        geo_enabled?: boolean;
        id: number;
        id_str: string;
        is_translator?: boolean;
        lang: string;
        listed_count: number;
        location: string;
        name: string;
        notifications?: boolean;
        profile_background_color: string;
        profile_background_image_url: string;
        profile_background_image_url_https: string;
        profile_background_tile: boolean;
        profile_banner_url: string;
        profile_image_url: string;
        profile_image_url_https: string;
        profile_link_color: string;
        profile_sidebar_border_color: string;
        profile_sidebar_fill_color: string;
        profile_text_color: string;
        profile_use_background_image: boolean;
        protected: boolean;
        screen_name: string;
        show_all_inline_media: boolean;
        status?: Status;
        statuses_count: number;
        time_zone?: string;
        url: string;
        utc_offset?: number;
        verified: boolean;
        withheld_in_countries: string;
        withheld_scope: string;
    }

    // See https://dev.twitter.com/overview/api/places
    export interface PlaceAttribute {
        street_address: string;
        locality: string;
        region: string;
        iso3: string;
        postal_code: string;
        phone: string;
        twitter: string;
        url: string;
        'app:id': string;
    }
    export interface Place {
        geometry: GeoJSON.Point;
        attributes: PlaceAttribute;
        bounding_box: GeoJSON.Polygon;
        contained_within: Place[];
        country: string;
        country_code: string;
        full_name: string;
        id: string;
        name: string;
        place_type: string;
        url: string;
    }

    // See https://dev.twitter.com/overview/api/tweets
    export interface Status {
        id: number;
        id_str: string;
        annotations?: Object;
        contributors?: Contributors[];
        coordinates?: GeoJSON.Point;
        created_at: string;
        current_user_retweet?: {
            id: number;
            id_str: number;
        };
        entities: Entities;
        favorite_count?: number;
        favorited?: boolean;
        filter_level: 'none' | 'low' | 'medium';
        geo?: Object;
        in_reply_to_screen_name?: string;
        in_reply_to_status_id?: number;
        in_reply_to_status_id_str?: string;
        in_reply_to_user_id?: number;
        in_reply_to_user_id_str?: string;
        lang?: string;
        place?: Place;
        possibly_sensitive?: boolean;
        quoted_status_id?: number;
        quoted_status_id_str?: string;
        quoted_status?: Status;
        scopes?: Object;
        retweet_count: number;
        retweeted: boolean;
        retweeted_status?: Status;
        source?: string;
        text: string;
        timestamp_ms: string;
        truncated: boolean;
        user: User;
        withheld_copyright?: boolean;
        withheld_in_countries?: string[];
        withheld_scope?: string;
    }
}