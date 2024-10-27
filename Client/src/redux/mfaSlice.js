import { createSlice } from "@reduxjs/toolkit";

export const mfaSlice = createSlice({
    name: 'mfa',
    initialState: {
        systemConfiguration: {
          numOfUploadedImages: 9,
          numOfAuthenticatedImages: 4,
          numOfRelationTypes: 5,
          numOfImageEachRelationType: 2,
        },
        imageList: [],
        relationTypes: [
            {
              title: 'Relation Type 1',
              value: 'Relation Type 1'
            },
            {
              title: 'Relation Type 2',
              value: 'Relation Type 2'
            },
            {
              title: 'Relation Type 3',
              value: 'Relation Type 3'
            },
            {
              title: 'Relation Type 4',
              value: 'Relation Type 4'
            },
        ],
        relationships: [],
        //mock relationTypes value
        // {
        //     relation_id: 'userid+relationtype',
        //     type: 'type of relation',
        //     relatedImages: [
        //         {
        //             image1:'',
        //             image2:'',
        //         },
        //         {
        //             image1:'',
        //             image2:'',
        //         }
        //     ],
        // }
    },
    reducers: {
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
    },
})