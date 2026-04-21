import { all } from "redux-saga/effects"
import { MaincategorySagas } from "./MaincategorySagas";
import { SubcategorySagas } from "./SubcategorySagas";
import { BrandSagas } from "./BrandSagas";
import { FeatureSagas } from "./FeatureSagas";
import { FaqSagas } from "./FaqSagas";
import { ProductSagas } from "./ProductSagas";
import { SettingSagas } from "./SettingSagas";
import { NewsletterSagas } from "./NewsletterSagas";
import { TestimonialSagas } from "./TestimonialSagas";
import { WishlistSagas } from "./WishlistSagas";
import { UserSagas } from "./UserSagas";
import { CheckoutSagas } from "./CheckoutSagas";
import { ContactUsSagas } from "./ContactUsSagas";
import { CartSagas } from "./CartSagas";


export default function* RootSagas() {
    yield all([
        MaincategorySagas(),
        SubcategorySagas(),
        BrandSagas(),
        FeatureSagas(),
        FaqSagas(),
        ProductSagas(),
        SettingSagas(),
        TestimonialSagas(),
        NewsletterSagas(),
        CartSagas(),
        WishlistSagas(),
        ContactUsSagas(),
        WishlistSagas(),
        UserSagas(),
        CheckoutSagas()
    ])
}
