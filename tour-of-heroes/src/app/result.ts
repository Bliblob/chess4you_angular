export interface Href {
    href: string;
}
export interface Links {
    self: Href;
    hero: Href;
}
export interface Result {
    _embedded: Embedded;
    _links: Links;
}
export interface Embedded {
    heroList: Hero[];
}
export interface Hero {
    id: number;
    name: string;
    _links: Links;
}
