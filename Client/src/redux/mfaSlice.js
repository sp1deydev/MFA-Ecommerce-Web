import { createSlice } from "@reduxjs/toolkit";

export const mfaSlice = createSlice({
    name: 'mfa',
    initialState: {
        isLoading: true,
        systemConfiguration: {
          id: '',
          numOfUploadedImages: 0,
          numOfAuthenticatedImages: 0,
          numOfRelationTypes: 0,
          numOfImageEachRelationType: 0,
        },
        imageList: [
            {
                "uid": "rc-upload-1730660552903-3",
                "name": "1730660596150-download.png",
                "status": "done",
                "url": "http://localhost:3001/uploads\\1730660596150-download.png"
            },
            {
                "uid": "rc-upload-1730660552903-5",
                "name": "1730660604617-images.jpeg",
                "status": "done",
                "url": "http://localhost:3001/uploads\\1730660604617-images.jpeg"
            },
            {
                "uid": "rc-upload-1730660552903-7",
                "name": "1730660606851-download (1).png",
                "status": "done",
                "url": "http://localhost:3001/uploads\\1730660606851-download (1).png"
            },
            {
                "uid": "rc-upload-1730660552903-9",
                "name": "1730660609580-download.png",
                "status": "done",
                "url": "http://localhost:3001/uploads\\1730660609580-download.png"
            },
            {
                "uid": "rc-upload-1730660552903-11",
                "name": "1730660611881-download.png",
                "status": "done",
                "url": "http://localhost:3001/uploads\\1730660611881-download.png"
            },
            {
                "uid": "rc-upload-1730660552903-13",
                "name": "1730660614498-download.png",
                "status": "done",
                "url": "http://localhost:3001/uploads\\1730660614498-download.png"
            },
            {
                "uid": "rc-upload-1730660552903-15",
                "name": "1730660616673-download.png",
                "status": "done",
                "url": "http://localhost:3001/uploads\\1730660616673-download.png"
            },
            {
                "uid": "rc-upload-1730660552903-17",
                "name": "1730660618803-download.png",
                "status": "done",
                "url": "http://localhost:3001/uploads\\1730660618803-download.png"
            },
            {
                "uid": "rc-upload-1730660552903-19",
                "name": "1730660621272-download.png",
                "status": "done",
                "url": "http://localhost:3001/uploads\\1730660621272-download.png"
            }
        ],
        relationTypes: [
            'Relation Type 1',
            'Relation Type 2',
            'Relation Type 3',
            'Relation Type 4',
        ],
        relationships: [],
        userSelectedRelationType: '',
        userSelectedImages: [],
        randomSelectedImages: [],
        randomSystemImages: [],
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setImageList: (state, action) => {
            state.imageList = action.payload
            state.relationships = []
        },
        setRelationTypes: (state, action) => {
            state.relationTypes = action.payload
        },
        setRelationships: (state, action) => {
          state.relationships = action.payload
        },
        setUserSelectedRelationType: (state, action) => {
          state.userSelectedRelationType = action.payload
        },
        setUserSelectedImages: (state, action) => {
          state.userSelectedImages = action.payload
        },
        SetRandomSelectedImages: (state, action) => {
          state.randomSelectedImages = action.payload
        },
        SetRandomSystemImages: (state, action) => {
          state.randomSystemImages = action.payload
        },
        setSystemConfiguration: (state, action) => {
            state.systemConfiguration = action.payload
        }
    },
})