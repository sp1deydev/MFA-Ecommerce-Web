import { createSlice } from "@reduxjs/toolkit";

export const mfaSlice = createSlice({
    name: 'mfa',
    initialState: {
        imageList: [],
        relationTypes: [],
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
    },
})