import { ICrystal } from "@/types/Crystal"

export const crystals: ICrystal[] = [
    {
        _id: "uuid-1",
        name: "Abalone",
        nickname: "",
        images: ["/assets/images/crystals/image-coming-soon-placeholder.png"],
        general_description: "The Ears of the Sea",
        chakras: ["Crown","Root","Solar Plexus"],
    },
    {
        _id: "uuid-2",
        name: "Agate",
        nickname: "",
        images: ["/assets/images/crystals/image-coming-soon-placeholder.png"],
        general_description: "The Stabilizer",
    },
    {
        _id: "uuid-3",
        name: "Amazonite",
        nickname: "",
        images: ["/assets/images/crystals/image-coming-soon-placeholder.png"],
        general_description: "The Playmate",
    },
    {
        _id: "uuid-4",
        name: "Amethyst",
        nickname: "",
        images: ["/assets/images/crystals/image-coming-soon-placeholder.png"],
        general_description: "The Intuitive Eye",
    },
    {
        _id: "uuid-5",
        name: "Angel Aura Quartz",
        nickname: "",
        images: ["/assets/images/crystals/image-coming-soon-placeholder.png"],
    },
    {
        _id: "uuid-6",
        name: "Angelite",
        nickname: "",
        images: ["/assets/images/crystals/image-coming-soon-placeholder.png"],
    },
    {
        _id: "uuid-7",
        name: "Apatite",
        nickname: "",
        images: ["/assets/images/crystals/image-coming-soon-placeholder.png"],
        general_description: "Increase Your Appetite for Life",
    },
    {
        _id: "uuid-8",
        name: "Apophyllite",
        nickname: "",
        images: ["/assets/images/crystals/image-coming-soon-placeholder.png"],
        general_description: "The Spiritual Advisor",
    },
    {
        _id: "uuid-9",
        name: "Aquamarine",
        nickname: "",
        images: ["/assets/images/crystals/image-coming-soon-placeholder.png"],
        general_description: "The Tranquilizer",
    },
    {
        _id: "uuid-10",
        name: "Aragonite",
        nickname: "",
        images: ["/assets/images/crystals/image-coming-soon-placeholder.png"],
    },
    {
        _id: "uuid-11",
        name: "Aventurine",
        nickname: "",
        images: ["/assets/images/crystals/image-coming-soon-placeholder.png"],
        general_description: "The Manifester",
    },
    {
        _id: "uuid-12",
        name: "Azurite",
        nickname: "",
        images: ["/assets/images/crystals/image-coming-soon-placeholder.png"],
        general_description: "The Wizard",
    }
];

export const getCrystal = (_id: string) => {
    return crystals.find(crystal => crystal._id === _id)
}