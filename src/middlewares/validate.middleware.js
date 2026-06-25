/**
 * Reusable Zod validation middleware factory.
 *
 * Usage:
 *   validate({ body: myBodySchema, params: myParamSchema, query: myQuerySchema })
 *
 * Each key is optional — only the schemas you pass will be validated.
 */
const validate = ({ body, params, query } = {}) => {
  return (req, res, next) => {
    const errors = [];

    if (body) {
      const result = body.safeParse(req.body);
      if (!result.success) {
        errors.push(...result.error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })));
      }
    }

    if (params) {
      const result = params.safeParse(req.params);
      if (!result.success) {
        errors.push(...result.error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })));
      }
    }

    if (query) {
      const result = query.safeParse(req.query);
      if (!result.success) {
        errors.push(...result.error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })));
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    next();
  };
};

module.exports = validate;
