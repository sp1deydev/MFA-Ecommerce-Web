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
        imageList: [],
        uploadedGeneralImage: [],
        relationTypes: [
            'Relation Type 1',
            'Relation Type 2',
            'Relation Type 3',
            'Relation Type 4',
        ],
        relationships: [],
        userSelectedRelationType: '',
        userSelectedImages: [],
        randomSelectedRelationType: {
            "images": [
                {
                    "uid": "rc-upload-1730660552903-3",
                    "name": "1730660596150-download.png",
                    "status": "done",
                    "url": "http://localhost:3001/uploads\\1730660596150-download.png"
                },
                {
                    "uid": "rc-upload-1730660552903-9",
                    "name": "1730660609580-download.png",
                    "status": "done",
                    "url": "http://localhost:3001/uploads\\1730660609580-download.png"
                }
            ],
            "relationtype": "Relation Type 4"
        },
        randomSelectedImages: [],
        randomSystemImages: [],
        authenticationDisplayImages: [],
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
        setRandomSelectedRelationType: (state, action) => {
          state.randomSelectedRelationType = action.payload
        },
        setUserSelectedImages: (state, action) => {
          state.userSelectedImages = action.payload
        },
        setRandomSelectedImages: (state, action) => {
          state.randomSelectedImages = action.payload
        },
        setRandomSystemImages: (state, action) => {
          state.randomSystemImages = action.payload
        },
        setSystemConfiguration: (state, action) => {
            state.systemConfiguration = action.payload
        },
        setAuthenticationDisplayImages: (state, action) => {
            state.authenticationDisplayImages = action.payload
        },
        setUploadedGeneralImage: (state, action) => {
            state.uploadedGeneralImage = action.payload
        }
    },
})