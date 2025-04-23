//Entidad de provider
export interface Provider{
    id:string;
    providerName:string;
    providedLang:string;
    logoUrl:string;
    isActive:boolean;
}

export interface Manga{
    id:string;
    title:string;
    author:string;
    description:string;
    chaptersCount:number;
    volumesCount:number;
    faviconUrl:string;
    coverUrl:string;
    rating?: number;
    createdAt:string;
    updatedAt:string;
    volumes?:  Volume[];
}

export interface Volume{
    id:string;
    mangaId:string;
    volumeNumber:number;
    title:string;
    coverUrl:string;
    createdAt:string;
    updatedAt:string;
}


export interface Chapter{
    id:string;
    volumeId:string;
    chapterNumber:number;
    title:string;
    createdAt:string;
    updatedAt:string;
}

export interface ChapterSource{
    id:string;
    languageCode:string;
    providerName:string;
    logoUrl:string;
    isActive:boolean;
}


export interface ChapterSourcePage{
    id:string;
    pageNumber:number;
    imageUrl:string;
    createdAt:string;
    updatedAt:string;
}

export interface Comment{
    id:string;
    userId:string;
    mangaId:string;
    chapterId:string;
    content:string;
    createdAt:string;
}

export interface Like{
    id:string;
    userId:string;
    mangaId:string;
    timestamp:string;
}

export interface  Preferences{
    theme:string;
    readingDirection:"rtl"|"ltr";
    defaultProvider:string;
}


export interface ReadingEntry{
    mangaId:string;
    mangaTitle:string;
    coverUrl:string;
    faviconUrl:string;
    chapterId:string;
    lastPageRead:number;
    lastReadAt:string;
    status:string;
}

export interface AppUser{
    id:string;
    email:string;
    password:string;
    role:string;
    enabled:boolean;
    createdAt:string;
    fullName:string;
    photoUrl:string;
    provider:string;
    providerId:string;
}


