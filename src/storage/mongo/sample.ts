import { SampleRepo, ISampleAllResponse } from '../repo/sample';
import Sample, { ISample } from '../../models/sample';
import { findAllQuery } from '../../types/queryModel';
import { logger } from '../../config/logger';

export class SampleStorage implements SampleRepo {
  private scope = 'storage.sample';
  async create(payloads: ISample): Promise<string> {
    throw new Error('not implemented yet');
  }

  async update(slug: string, payload: ISample): Promise<string> {
    return '';
  }

  async delete(slug: string): Promise<any> {}

  async get(slug: string, lang: string): Promise<ISample> {
    try {
      let dbObj = await Sample.findOne({ slug, lang });

      if (!dbObj) {
        logger.warn(
          `${this.scope}.get failed to findOne with slug: ${slug} and ${lang}`
        );
        throw new Error('DB object is not found');
      }

      return dbObj;
    } catch (err) {
      logger.error(`${this.scope}.get: finished with error: ${err.message}`);
      throw new Error('Failed to get the object from DB');
    }
  }

  async findAll(query: findAllQuery): Promise<ISampleAllResponse> {
    throw new Error('not implemented yet');
  }
}
