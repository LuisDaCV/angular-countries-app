export interface Region {
    name:         Name;
    tld?:         string[];
    cca2:         string;
    ccn3?:        string;
    cioc?:        string;
    independent:  boolean;
    status:       Status;
    unMember:     boolean;
    currencies:   { [key: string]: Currency };
    idd:          Idd;
    capital:      string[];
    altSpellings: string[];
    region:       RegionElement;
    subregion:    Subregion;
    languages:    Languages;
    latlng:       number[];
    landlocked:   boolean;
    borders?:     string[];
    area:         number;
    demonyms:     Demonyms;
    cca3:         string;
    translations: { [key: string]: Translation };
    flag:         string;
    maps:         Maps;
    population:   number;
    gini?:        { [key: string]: number };
    fifa?:        string;
    car:          Car;
    timezones:    string[];
    continents:   RegionElement[];
    flags:        Flags;
    coatOfArms:   CoatOfArms;
    startOfWeek:  StartOfWeek;
    capitalInfo:  CapitalInfo;
    postalCode:   PostalCode;
}

export interface CapitalInfo {
    latlng: number[];
}

export interface Car {
    signs: string[];
    side:  Side;
}

export enum Side {
    Left = "left",
    Right = "right",
}

export interface CoatOfArms {
    png?: string;
    svg?: string;
}

export enum RegionElement {
    Asia = "Asia",
    Europe = "Europe",
}

export interface Currency {
    symbol: string;
    name:   string;
}

export interface Demonyms {
    eng: Eng;
    fra: Eng;
}

export interface Eng {
    f: string;
    m: string;
}

export interface Flags {
    png:  string;
    svg:  string;
    alt?: string;
}

export interface Idd {
    root:     string;
    suffixes: string[];
}

export interface Languages {
    lit?: string;
    hrv?: string;
    dan?: string;
    sqi?: string;
    eng?: string;
    mlt?: string;
    deu?: string;
    fra?: string;
    slk?: string;
    ell?: string;
    nld?: string;
    tur?: string;
    ces?: string;
    ita?: string;
    cat?: string;
    est?: string;
    hun?: string;
    cnr?: string;
    mkd?: string;
    nrf?: string;
    lav?: string;
    swe?: string;
    nfr?: string;
    nor?: string;
    fin?: string;
    rus?: string;
    gle?: string;
    bel?: string;
    ukr?: string;
    bul?: string;
    bos?: string;
    srp?: string;
    glv?: string;
    ltz?: string;
    gsw?: string;
    roh?: string;
    nno?: string;
    nob?: string;
    smi?: string;
    fao?: string;
    spa?: string;
    eus?: string;
    glc?: string;
    slv?: string;
    ron?: string;
    isl?: string;
    lat?: string;
    pol?: string;
    por?: string;
}

export interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: { [key: string]: Translation };
}

export interface Translation {
    official: string;
    common:   string;
}

export interface PostalCode {
    format: null | string;
    regex:  null | string;
}

export enum StartOfWeek {
    Monday = "monday",
}

export enum Status {
    OfficiallyAssigned = "officially-assigned",
    UserAssigned = "user-assigned",
}

export enum Subregion {
    CentralEurope = "Central Europe",
    EasternEurope = "Eastern Europe",
    NorthernEurope = "Northern Europe",
    SoutheastEurope = "Southeast Europe",
    SouthernEurope = "Southern Europe",
    WesternEurope = "Western Europe",
}
