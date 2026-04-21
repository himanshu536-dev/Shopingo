import { combineReducers } from "@reduxjs/toolkit";
import { MaincategoryReducer } from "./MaincategoryReducer";
import { SubcategoryReducer } from "./SubcategoryReducer";
import { BrandReducer } from "./BrandReducer";
import { FeatureReducer } from "./FeatureReducer";
import { FaqReducer } from "./FaqReducer";
import { ProductReducer } from "./ProductReducer";
import { SettingReducer } from "./SettingReducer";
import { NewsletterReducer } from "./NewsletterReducer"
import { TestimonialReducer } from "./TestimonialReducer"
import { CartReducer } from "./CartReducer"
import { ContactUsReducer } from "./ContactUsReducer"
import { CheckoutReducer } from "./CheckoutReducer"
import { UserReducer } from "./UserReducer"
import { WishlistReducer } from './WishlistReducer'

export default combineReducers(
    {
        MaincategoryStateData: MaincategoryReducer,
        SubcategoryStateData: SubcategoryReducer,
        BrandStateData: BrandReducer,
        FeatureStateData: FeatureReducer,
        FaqStateData: FaqReducer,
        ProductStateData: ProductReducer,
        SettingStateData: SettingReducer,
        NewsletterStateData: NewsletterReducer,
        UserStateData: UserReducer,
        CartStateData: CartReducer,
        WishlistStateData: WishlistReducer,
        CheckoutStateData: CheckoutReducer,
        ContactUsStateData: ContactUsReducer,
        TestimonialStateData: TestimonialReducer
    }
)
