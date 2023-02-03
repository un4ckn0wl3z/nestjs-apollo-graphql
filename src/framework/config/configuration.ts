import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = process.env.ZONE + '.config.yaml';

export default () => {
  return yaml.load(
    readFileSync(join(__dirname + "../../../config", YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};