import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums";
import { getAllChannels } from "../../services/channelApi";

const useAllChannels = () =>
  useQuery({
    queryKey: [QueryKeys.channel, "all"],
    queryFn: getAllChannels,
  });

export default useAllChannels;
