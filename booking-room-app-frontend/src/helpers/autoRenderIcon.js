import { IoRestaurantOutline, IoCarSportOutline } from "react-icons/io5";
import { MdFamilyRestroom, MdOutlineCoffeeMaker } from "react-icons/md";
import { LiaSmokingBanSolid } from "react-icons/lia";
import { RiFridgeLine } from "react-icons/ri";
import { PiWashingMachine } from "react-icons/pi";
import { MdCheck } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { CiWifiOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";


const icons = [
    <CiWifiOn />,
    <IoCarSportOutline />,
    <MdFamilyRestroom />,
    <LiaSmokingBanSolid />,
    <IoRestaurantOutline />,
    <MdOutlineCoffeeMaker />,
    <RiFridgeLine />,
    <PiWashingMachine />,
]

const autoRenderIcon = (id) => icons[id-1];
export default autoRenderIcon;