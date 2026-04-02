import { apiSlice } from "./apiSlice";


export const dropdownApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getIncome : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getIncomeDropdown',
                method: 'GET'
            })
        }),
        getFatherOccupation : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getFatherOccupationDropdown',
                method: 'GET'
            })
        }),
        getMotherOccupation : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getMotherOccupationDropdown',
                method: 'GET'
            })
        }),
        getReligion : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getReligionDropdown',
                method: 'GET'
            })
        }),
        getCommunity : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getCommunityDropdown',
                method: 'GET'
            })
        }),

        getMotherToungue : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getMotherToungueDropdown',
                method: 'GET'
            })
        }),

        getHeight : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getHeightDropdown',
                method: 'GET'
            })
        }),

        getQualification : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getQualificationDropdown',
                method: 'GET'
            })
        }),

        getOccupation : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getOccupationDropdown',
                method: 'GET'
            })
        }),

        getSmokingHabbit : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getSmokingHabbitDropdown',
                method: 'GET'
            })
        }),

        getDrinkingHabbit : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getDrinkingHabbitDropdown',
                method: 'GET'
            })
        }),

        getDiet : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getDietDropdown',
                method: 'GET'
            })
        }),

        getComplexion : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getComplexionDropdown',
                method: 'GET'
            })
        }),
        getAustralianVisaStatus : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getAustralianVisaStatusDropdown',
                method: 'GET'
            })
        }),

        getEthnics : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getEthnicsDropdown',
                method: 'GET'
            })
        }),

        getMaritalStatus : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getMaritalStatusDropdown',
                method: 'GET'
            })
        }),

        getCitizenship : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getCitizenshipDropdown',
                method: 'GET'
            })
        }),

        getCaste : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getCasteDropdown',
                method: 'GET'
            })
        }),

        getBodyType : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getBodyTypeDropdown',
                method: 'GET'
            })
        }),
        getGotra : builder.query<void, void>({
            query: () => ({
                url: 'dropdown/getGotrasDropdown',
                method: 'GET'
            })
        }),
        

    }),
});

export const {
    useGetIncomeQuery,
    useGetFatherOccupationQuery,
    useGetMotherOccupationQuery,
    useGetReligionQuery,
    useGetCommunityQuery,
    useGetMotherToungueQuery,
    useGetHeightQuery,
    useGetQualificationQuery,
    useGetOccupationQuery,
    useGetSmokingHabbitQuery,
    useGetDrinkingHabbitQuery,
    useGetDietQuery,
    useGetComplexionQuery,
    useGetAustralianVisaStatusQuery,
    useGetEthnicsQuery,
    useGetMaritalStatusQuery,
    useGetCitizenshipQuery,
    useGetCasteQuery,
    useGetBodyTypeQuery,
    useGetGotraQuery
} = dropdownApi;