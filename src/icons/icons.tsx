import { IconContext } from "react-icons";
import { FiSearch } from "react-icons/fi";
import { PiSunHorizon } from "react-icons/pi";
import { PiMoon } from "react-icons/pi";
import { FaSnowflake } from "react-icons/fa6";
import { TbLoader2 } from "react-icons/tb";
import { IoIosArrowRoundBack } from "react-icons/io";



export const SearchIcon = <IconContext.Provider value={{}}>
                            <FiSearch/>
                          </IconContext.Provider> 

export const SunIcon = <IconContext.Provider value={{}}>
                          <PiSunHorizon/>
                        </IconContext.Provider> 

export const MoonIcon = <IconContext.Provider value={{}}>
                          <PiMoon/>
                        </IconContext.Provider> 

export const SnowIcon = <IconContext.Provider value={{}}>
                          <FaSnowflake/>
                        </IconContext.Provider>

export const LoadingIcon = <IconContext.Provider value={{}}>
                              <TbLoader2/>
                            </IconContext.Provider>

export const BackIcon = <IconContext.Provider value={{}}>
                              <IoIosArrowRoundBack/>
                            </IconContext.Provider>
