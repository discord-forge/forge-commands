import {Role} from "discord.js";
import {ChatEnvironment, Command, Argument, CommandContext, RestrictGroup, PrimitiveArgType} from "@cloudrex/forge";

type RolesArgs = {
    readonly page: number;
}

export default class RolesCommand extends Command {
    readonly meta = {
        name: "roles",
        description: "Display the server's roles",
    };

    readonly arguments: Argument[] = [
        {
            name: "page",
            type: PrimitiveArgType.UnsignedInteger,
            defaultValue: 0
        }
    ];

    readonly restrict: any = {
        specific: [RestrictGroup.ServerModerator],
        environment: ChatEnvironment.Guild
    };

    public async executed(context: CommandContext, args: RolesArgs): Promise<void> {
        await context.ok(context.message.guild.roles.array()
            .map((role: Role) => `<@&${role.id}> => ${role.id}`)
            .join("\n")
            .substring(args.page * 2048)
            .substr(0, 2048));
    }
};