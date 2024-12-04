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
        randomSelectedRelationType: {},
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
        setUserSelectedImages: (state, action) => {
          state.userSelectedImages = action.payload
        },
        setSystemConfiguration: (state, action) => {
            state.systemConfiguration = action.payload
        },
        setAuthenticationDisplayImages: (state, action) => {
            state.authenticationDisplayImages = action.payload.displayImages;
            state.randomSelectedImages = action.payload.randomSelectedImages;
            state.randomSelectedRelationType = action.payload.randomSelectedRelationType;
        },
        setUploadedGeneralImage: (state, action) => {
            state.uploadedGeneralImage = action.payload
        }
    },
})