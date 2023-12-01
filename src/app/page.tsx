import {Header} from "@/components/layout/Header";
import {Hero} from "@/components/layout/Hero";
import {HomeMenu} from "@/components/layout/HomeMenu";
import {SectionHeader} from "@/components/layout/SectionHeader";

export default function Home() {
    return (
        <>
            <Header/>
            <Hero/>
            <HomeMenu/>
            <section className="text-center my-16">
                <SectionHeader subHeader={'Our story'}
                               mainHeader={"About Us"}/>
                <div className="max-w-2xl mx-auto text-gray-500 mt-4">
                    <p className="">
                        asdasdasdasdfasdhfh asd hfhasdk
                        hkjh uahsdfkj haksh khhasdfkh askdhf
                        kashd fhaskd fhak sfkashdfk ha
                    </p>

                    <p className="">
                        asdasdasdasdfasdhfh asd hfhasdk
                        hkjh uahsdfkj haksh khhasdfkh askdhf
                        kashd fhaskd fhak sfkashdfk haasdf
                        asdf asdf asd f asdf asdf asdf
                        asdfasdfasdf
                        afdsasdf asdf
                        adfsadfs
                    </p>
                </div>
            </section>

            <section className="text-center my-8">
                <SectionHeader subHeader={'Don\'t hesitate'}
                               mainHeader={"Contact Us"}/>

                <div className="mt-8">
                    <a className="text-4xl underline text-gray-500"
                       href="tel: +380684300807">
                        +380 684 300 807
                    </a>
                </div>
            </section>
            <footer className="border-t p-8 text-center text-gray-500
            mt-16">
                &copy; 2023 All rights reserver
            </footer>
        </>
    )
}
