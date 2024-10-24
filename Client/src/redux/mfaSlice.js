import { createSlice } from "@reduxjs/toolkit";

export const mfaSlice = createSlice({
    name: 'mfa',
    initialState: {
        imageList: [],
        relationTypes: [
            {
              title: 'Relation Type 1',
            },
            {
              title: 'Relation Type 2',
            },
            {
              title: 'Relation Type 3',
            },
            {
              title: 'Relation Type 4',
            },
        ],
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
        },
        setRelationTypes: (state, action) => {
            state.relationTypes = action.payload
        },
    },
})