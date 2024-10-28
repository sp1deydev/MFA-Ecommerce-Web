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
        imageList: [
          {
              "uid": "rc-upload-1730085909393-2",
              "name": "1730085912346-275097726_354306753276397_3570733209895545930_n.jpg",
              "status": "done",
              "url": "http://localhost:3001/uploads\\1730085912346-275097726_354306753276397_3570733209895545930_n.jpg"
          },
          {
              "uid": "rc-upload-1730085909393-4",
              "name": "1730085914666-399405994_904004437962999_8837288258346405781_n.jpg",
              "status": "done",
              "url": "http://localhost:3001/uploads\\1730085914666-399405994_904004437962999_8837288258346405781_n.jpg"
          },
          {
              "uid": "rc-upload-1730085909393-6",
              "name": "1730085916884-434873873_800172138689218_6175057082809455981_n.png",
              "status": "done",
              "url": "http://localhost:3001/uploads\\1730085916884-434873873_800172138689218_6175057082809455981_n.png"
          },
          {
              "uid": "rc-upload-1730085909393-8",
              "name": "1730085921616-438037734_481219580900126_383468623299043374_n.jpg",
              "status": "done",
              "url": "http://localhost:3001/uploads\\1730085921616-438037734_481219580900126_383468623299043374_n.jpg"
          },
          {
              "uid": "rc-upload-1730085909393-10",
              "name": "1730085924021-bang diem test 6 ets 2023.png",
              "status": "done",
              "url": "http://localhost:3001/uploads\\1730085924021-bang diem test 6 ets 2023.png"
          },
          {
              "uid": "rc-upload-1730085909393-12",
              "name": "1730085926449-451581991_514695577916648_1333109415051119232_n.jpg",
              "status": "done",
              "url": "http://localhost:3001/uploads\\1730085926449-451581991_514695577916648_1333109415051119232_n.jpg"
          },
          {
              "uid": "rc-upload-1730085909393-14",
              "name": "1730085930028-434873873_800172138689218_6175057082809455981_n (1).png",
              "status": "done",
              "url": "http://localhost:3001/uploads\\1730085930028-434873873_800172138689218_6175057082809455981_n (1).png"
          },
          {
              "uid": "rc-upload-1730085909393-16",
              "name": "1730085932387-436221180_429173306719198_134195243373195111_n.jpg",
              "status": "done",
              "url": "http://localhost:3001/uploads\\1730085932387-436221180_429173306719198_134195243373195111_n.jpg"
          },
          {
              "uid": "rc-upload-1730085909393-18",
              "name": "1730085934919-434873873_800172138689218_6175057082809455981_n.png",
              "status": "done",
              "url": "http://localhost:3001/uploads\\1730085934919-434873873_800172138689218_6175057082809455981_n.png"
          },
          {
              "uid": "rc-upload-1730085909393-20",
              "name": "1730085939156-438037734_481219580900126_383468623299043374_n.jpg",
              "status": "done",
              "url": "http://localhost:3001/uploads\\1730085939156-438037734_481219580900126_383468623299043374_n.jpg"
          },
          {
              "uid": "rc-upload-1730085909393-22",
              "name": "1730085942063-434873873_800172138689218_6175057082809455981_n.png",
              "status": "done",
              "url": "http://localhost:3001/uploads\\1730085942063-434873873_800172138689218_6175057082809455981_n.png"
          },
          {
              "uid": "rc-upload-1730085909393-26",
              "name": "1730085956621-368456990_648125967411876_2747958777251265360_n.jpg",
              "status": "done",
              "url": "http://localhost:3001/uploads\\1730085956621-368456990_648125967411876_2747958777251265360_n.jpg"
          }
      ],
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
        userSelectedRelationType: '',
        userSelectedImages: [],
        randomSelectedImages: [],
        randomSystemImages: [],
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
    },
})